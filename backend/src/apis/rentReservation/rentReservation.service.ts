import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  RentReservation,
} from './entities/rentReservation.entity';
import { RentUser } from '../rentUser/entities/rentUser.entity';

@Injectable()
export class RentReservationService {
  constructor(
    @InjectRepository(RentReservation)
    private readonly rentReservationRepository: Repository<RentReservation>,

    @InjectRepository(RentUser)
    private readonly rentUserRepository: Repository<RentUser>,

    private readonly connection: Connection,
  ) {}

  async findAll() {
    return await this.rentReservationRepository.find({
      relations: ['rentUser', 'rent'],
    });
  }

  async findOne({ imp_uid }) {
    return await this.rentReservationRepository.findOne({
      where: { imp_uid },
      relations: ['rentUser', 'rent'],
    });
  }

  async checkDuplicate({ imp_uid }) {
    // 중복된 아이디
    // 아임포트 uid 찾기.
    const result = await this.rentReservationRepository.findOne({ imp_uid });
    if (result) throw new ConflictException('이미 결제된 아이디입니다.');
  }

  async checkAlreadyCanceled({ imp_uid }) {
    const rentReservationCancel = await this.rentReservationRepository.findOne({
      imp_uid,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL, // 이것이 중요
    });
    if (rentReservationCancel)
      throw new ConflictException('이미 취소된 결제 아이디입니다.');
  }

  async checkHasCancelablePrice({ imp_uid, currentUser }) {
    const refundPrice = await this.rentReservationRepository.findOne({
      imp_uid,
      rentUser: { id: currentUser.id }, // 결제했던 유저가 맞는지도 확인!
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    if (!refundPrice)
      throw new UnprocessableEntityException('결제기록이 존재하지 않습니다.');
  } // 나중에 숙소가 이 날짜에 예약이 되어있는지 없는지 판단 로직!

  async cancel({ imp_uid, price, currentUser, rentId }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const ids1 = await this.rentUserRepository.findOne({
        where: { email: currentUser.email }, // currnetUser에 로그인한 유저의 모든 정보가 담긴다.
      });

      const rentReservation = await this.rentReservationRepository.create({
        imp_uid,
        price: -price,
        // user: currentUser,
        rent: { id: rentId },
        rentUser: { id: ids1.id },
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      });
      await queryRunner.manager.save(rentReservation);

      await queryRunner.commitTransaction();

      return rentReservation;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create({ imp_uid, price, currentUser, rentId }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect(); // 트랜잭션 연결

    // transaction 시작!!
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1. RentReservation 테이블에 거래기록 1줄 생성
      const ids1 = await this.rentUserRepository.findOne({
        where: { email: currentUser.email }, // currnetUser에 로그인한 유저의 모든 정보가 담긴다.
      });

      // 2. 검증 후 DB에 저장하기
      const rentReservation = await this.rentReservationRepository.create({
        imp_uid: imp_uid,
        price: price,
        // user: currentUser,
        rent: { id: rentId },
        rentUser: { id: ids1.id },
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT, // 지불한 상태를 저장!
      });

      await queryRunner.manager.save(rentReservation);

      await queryRunner.commitTransaction();

      // 3. 최종결과 프론트엔드에 돌려주기
      return rentReservation;
    } catch (error) {
      // rollback 되돌리기!!
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release(); // 성공하든 실패하든 마지막에 연결 끊어주기.
    }
  }
}
