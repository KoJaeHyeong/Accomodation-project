import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { RentImage } from './entities/rentImage.entity';
import { RentImageService } from './rentImage.service';
import { updateRentImageInput } from './dto/updateRentImage.input';

@Resolver()
export class RentImageResolver {
  constructor(
    private readonly rentImageService: RentImageService, //
  ) {}

  @Mutation(() => RentImage)
  async createRentImage(
    @Args('rentId') rentId: string, //
    @Args({ name: 'mainUrl', type: () => [String] }) mainUrl: string[],
  ) {
    return await this.rentImageService.create({
      mainUrl: mainUrl,
      rentId,
    });
  }

  @Mutation(() => RentImage)
  updateRentImage(
    @Args('updateRentImageInput') updateRentImageInput: updateRentImageInput,
  ) {
    return this.rentImageService.update({ updateRentImageInput });
  }
}
