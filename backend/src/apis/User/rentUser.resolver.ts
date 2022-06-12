import { Args, Mutation, Resolver, Query, ObjectType } from '@nestjs/graphql';
import { createRentUserInput } from './dto/creatRentUser.input';
import { updateRentUserInput } from './dto/updateRentUser.input';
import { RentUser } from './entities/rentUser.entity';
import { RentUserService } from './rentUser.service';
import * as bcrypt from 'bcrypt';
import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guard';

@Resolver()
export class RentUserResolver {
  constructor(
    private readonly rentUserService: RentUserService, //
  ) {}

  @Query(() => [RentUser])
  fetchRentUsers() {
    return this.rentUserService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => RentUser)
  fetchRentUser(
    @CurrentUser() currentUser: any,
    @Args('email') email: string, //
  ) {
    return this.rentUserService.findOne({ email });
  }
  @Mutation(() => RentUser)
  async createRentUser(
    @Args('createUserInput') createRentUserInput: createRentUserInput,
  ) {
    const hashedPassword = await bcrypt.hash(createRentUserInput.password, 10);
    createRentUserInput.password = hashedPassword;
    return this.rentUserService.create({ createRentUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => RentUser)
  async updateRentUser(
    @CurrentUser() currentUser: any,
    @Args('email') email: string,
    @Args('originalPassword') originalPassword: string,
    @Args('updateRentUserInput') updateRentUserInput: updateRentUserInput,
  ) {
    const currentEmail = currentUser.email;
    console.log(currentEmail);
    return await this.rentUserService.update({
      currentEmail,
      email,
      originalPassword,
      updateRentUserInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteRentUser(
    @CurrentUser() currentUser: any,
    @Args('email') email: string, //
  ) {
    return this.rentUserService.delete({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @CurrentUser() currentUser: any, //
  ) {
    return currentUser.email;
  }
}
