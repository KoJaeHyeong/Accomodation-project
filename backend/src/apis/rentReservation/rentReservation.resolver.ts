import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  RentReservation,
} from './entities/rentReservation.entity';
import { RentReservationService } from './rentReservation.service';

@Resolver()
export class RentReservationResolver {
  constructor(
    private readonly rentReservationService: RentReservationService, //
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard) // 로그인한 사람만 가능이기 때문에, 가드를 통해서 검증
  @Mutation(() => RentReservation)
  async createRentReservation(
    @Args('imp_uid') imp_uid: string,
    @Args('price') price: number,
    @Args('rentId') rentId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 검증로직들 !!
    // 1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인한다.
    const token = await this.iamportService.getToken();
    // 금액이 잘못되었는지 판단 하는 부분
    await this.iamportService.checkPaid({ imp_uid, price, token });

    // 2. rentReservation 테이블에는 imp_uid가 1번만 존재해야 한다.(중복 결제를 체크)
    await this.rentReservationService.checkDuplicate({ imp_uid });

    return this.rentReservationService.create({
      imp_uid,
      price,
      currentUser,
      rentId,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => RentReservation)
  async cancelRentReservation(
    @Args('imp_uid') imp_uid: string,
    @Args('rentId') rentId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 결제 검증로직등!!
    // 1. 이미 취소된 건인지 확인
    await this.rentReservationService.checkAlreadyCanceled({ imp_uid });

    // 2. 결제기록이 존재하는지

    await this.rentReservationService.checkHasCancelablePrice({
      imp_uid,
      currentUser,
    });

    // 3. 실제로 아임포트에 취소 요청하기
    const token = await this.iamportService.getToken();
    const canceledAmount = await this.iamportService.cancel({ imp_uid, token });

    // 4. RentReservation 테이블에 결제 취소 등록하기, 결제테이블은 히스토리 관리가 중요하다!!
    return await this.rentReservationService.cancel({
      imp_uid,
      price: canceledAmount,
      currentUser,
      rentId,
    });
  }
}
