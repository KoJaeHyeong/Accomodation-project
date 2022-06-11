import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { createRentHostInput } from './dto/createRentHost.input';
import { RentHost } from './entities/rentHost.entity';
import { RentHostService } from './rentHost.service';
import { updateRentHostInput } from './dto/updateRentHost.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class RentHostResolver {
  constructor(private readonly rentHostService: RentHostService) {}

  @Query(() => [RentHost])
  fetchRentHosts() {
    return this.rentHostService.findAll();
  }

  @Query(() => RentHost)
  fetchRentHost(
    @Args('rentHostId') rentHostId: string, //
  ) {
    return this.rentHostService.findOne({ rentHostId });
  }

  @UseGuards(GqlAuthAccessGuard) // 인증된 회원만 호스트 만들기 가능
  @Mutation(() => RentHost)
  createRentHost(
    @CurrentUser() currentUser: any,
    @Args('email') email: string,
    @Args('createRentHostInput') createRentHostInput: createRentHostInput, //
  ) {
    const currentEmail = currentUser.email;
    return this.rentHostService.create({
      email,
      currentEmail,
      createRentHostInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => RentHost)
  async updateRentHost(
    @CurrentUser() currentUser: any,
    @Args('rentHostId') rentHostId: string,
    @Args('updateRentHostInput') updateRentHostInput: updateRentHostInput,
  ) {
    return await this.rentHostService.update({
      rentHostId,
      updateRentHostInput,
    });
  }

  @Mutation(() => Boolean)
  deleteRentHost(
    @Args('rentHostId') rentHostId: string, //
  ) {
    return this.rentHostService.delete({ rentHostId });
  }

  @Mutation(() => Boolean)
  restoreOneRentHost(
    @Args('rentHostId') rentHostId: string, //
  ) {
    return this.rentHostService.restoreOne({ rentHostId });
  }
}
