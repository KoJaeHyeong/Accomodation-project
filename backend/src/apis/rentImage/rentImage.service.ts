import { Injectable, Render } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addAbortSignal } from 'stream';
import { Repository } from 'typeorm';
import { Rent } from '../rent/entities/rent.entity';
import { RentImage } from './entities/rentImage.entity';

@Injectable()
export class RentImageService {
  constructor(
    @InjectRepository(RentImage)
    private readonly rentImageRepository: Repository<RentImage>,
  ) {}

  async create({ rentId, mainUrl }) {
    // 메인이미지, 서브이미지 배열에 담기
    console.log('====================');
    const result = [];
    for (let i = 0; i < mainUrl.length; i++) {
      const image = mainUrl[i];

      const image1 = await this.rentImageRepository.findOne({
        mainUrl: image,
        rent: {
          id: rentId,
        },
      });

      if (image1) {
        result.push(image1);
      } else {
        const image2 = await this.rentImageRepository.save({
          mainUrl: image,
          rent: {
            id: rentId,
          },
        });
        result.push(image2);
      }
    }
    console.log(result, 'AAA');

    return await this.rentImageRepository.findOne({
      where: {
        rent: {
          id: rentId,
        },
      },
      relations: ['rent'],
    });
  }

  async update({ updateRentImageInput }) {
    // Rent에서 찾아와서 그 값을 다 넣어줘야 플레이그라운드에서 가져올수 있다. 아침에 오면 바꾸자!
    await this.rentImageRepository.delete({
      rent: updateRentImageInput.rentId,
    });

    return await this.rentImageRepository.save({
      ...updateRentImageInput,
      rent: { id: updateRentImageInput.rentId },
    });
  }
}
