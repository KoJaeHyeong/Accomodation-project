import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentExplain } from '../rentExplain/entities/rentExplain.entity';
import { RentFacility } from '../rentFacility/entities/rentFacility.entity';
import { RentHost } from '../rentHost/entities/rentHost.entity';
import { RentToknow } from '../rentToknow/entities/rentToknow.entity';
import { Rent } from './entities/rent.entity';
import { RentLocation } from '../rentLoca/entities/rentLocation.entity';
import { RentTrans } from '../rentTrans/entities/rentTrans.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly rentRepository: Repository<Rent>,
    @InjectRepository(RentToknow)
    private readonly rentToknowRepository: Repository<RentToknow>,
    @InjectRepository(RentExplain)
    private readonly rentExplainRepository: Repository<RentExplain>,
    @InjectRepository(RentFacility)
    private readonly rentFacilityRepository: Repository<RentFacility>,
    @InjectRepository(RentLocation)
    private readonly rentLocationRepository: Repository<RentLocation>,
    @InjectRepository(RentTrans)
    private readonly rentTransRepository: Repository<RentTrans>,
  ) {}

  // async findAll() {  // 등록된 숙소 전체 조회하기
  //   return await this.rentRepository.find({
  //     relations: [
  //       'rentHost',
  //       'rentToknow',
  //       'rentExplain',
  //       'rentFacility',
  //       'rentLocation',
  //       'rentTrans',
  //     ],
  //   });
  // }

  async findOne({ rentId }) {
    return await this.rentRepository.findOne({
      where: { id: rentId },
      relations: [
        'rentHost',
        'rentToknow',
        'rentExplain',
        'rentFacility',
        'rentLocation',
        'rentTrans',
      ],
    });
  }

  async withdeletedfindOne({ rentId }) {
    return await this.rentRepository.findOne({
      where: { id: rentId },
      withDeleted: true,
      relations: ['rentHost', 'rentToknow', 'rentExplain'],
    });
  }

  async create({ createRentInput, createRentScoreInput }) {
    // 숙소이미지 등록
    const {
      rentHostId,
      rentToknow,
      rentExplain,
      rentFacility,
      rentLocation,
      rentTrans,
      ...rentscore
    } = createRentScoreInput;

    const result2 = await this.rentToknowRepository.save({
      ...rentToknow,
    });

    const result3 = await this.rentExplainRepository.save({
      ...rentExplain,
    });

    const result4 = [];
    for (let i = 0; i < rentFacility.length; i++) {
      //등록된 데이터인지 확인

      const facility = rentFacility[i];

      const facility1 = await this.rentFacilityRepository.findOne({
        lists: facility,
      });

      // 기존등록 확인
      if (facility1) {
        result4.push(facility1);
      } else {
        const facility2 = await this.rentFacilityRepository.save({
          lists: facility,
        });
        result4.push(facility2);
      }
    }
    const result5 = [];
    for (let i = 0; i < rentLocation.length; i++) {
      //등록된 데이터인지 확인

      const location = rentLocation[i];

      const location1 = await this.rentLocationRepository.findOne({
        lists: location,
      });

      // 기존등록 확인
      if (location1) {
        result5.push(location1);
      } else {
        const location2 = await this.rentLocationRepository.save({
          lists: location,
        });
        result5.push(location2);
      }
    }
    const result6 = [];
    for (let i = 0; i < rentTrans.length; i++) {
      //등록된 데이터인지 확인

      const trans = rentTrans[i];

      const trans1 = await this.rentTransRepository.findOne({
        lists: trans,
      });

      // 기존등록 확인
      if (trans1) {
        result6.push(trans1);
      } else {
        const trans2 = await this.rentTransRepository.save({
          lists: trans,
        });
        result6.push(trans2);
      }
    }

    return await this.rentRepository.save({
      ...createRentInput,
      ...rentscore,
      rentHost: { id: rentHostId },
      rentToknow: result2,
      rentExplain: result3,
      rentFacility: result4,
      rentLocation: result5,
      rentTrans: result6,
    });
  }

  async update({ rentId, updateRentScoreInput, updateRentInput }) {
    const rent = await this.rentRepository.findOne({
      where: { id: rentId },
    });

    const newRent = {
      ...rent,
      ...updateRentScoreInput,
      ...updateRentInput,
    };

    return await this.rentRepository.save(newRent);
  }

  async delete({ rentId }) {
    // 소프트딜리트
    const result = await this.rentRepository.softDelete({ id: rentId });
    return result.affected ? true : false;
  }

  async restoreOne({ rentId }) {
    const result = await this.rentRepository.restore({ id: rentId });
    return result.affected ? true : false;
  }
}
