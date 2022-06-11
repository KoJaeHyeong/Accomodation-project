import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RentCustomerService } from './rentCustomer.service';
import { RentCustomer } from './entities/rentCustomer.entity';
import { createRentCustomerInput } from './dto/createRentCustomer.input';
import { updateRentCustomerInput } from './dto/updateRentCustomer.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class RentCustomerResolver {
  constructor(
    private readonly rentCustomerService: RentCustomerService, //
  ) {}

  @Query(() => [RentCustomer])
  fetchCustomers() {
    return this.rentCustomerService.findAll();
  }

  @Query(() => RentCustomer)
  fetchCustomer(
    @Args('rentCustomerId') rentCustomerId: string, //}
  ) {
    return this.rentCustomerService.findOne({ rentCustomerId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => RentCustomer)
  createRentCustomer(
    @CurrentUser() currentUser: any,
    @Args('email') email: string,
    @Args('createRentCustomerInput')
    createRentCustomerInput: createRentCustomerInput,
  ) {
    const currentEmail = currentUser.email;
    console.log(currentEmail);
    return this.rentCustomerService.create({
      currentEmail,
      email,
      createRentCustomerInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => RentCustomer)
  updateRentCustomer(
    // @Args('rentId') rentId: string,
    @Args('updateRentCustomerInput')
    updateRentCustomerInput: updateRentCustomerInput,
  ) {
    return this.rentCustomerService.update({ updateRentCustomerInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteRentCustomer(
    @CurrentUser() currentUser: any,
    @Args('email') email: string, //
  ) {
    const currentEmail = currentUser.email;
    return this.rentCustomerService.delete({ email, currentEmail });
  }
}
