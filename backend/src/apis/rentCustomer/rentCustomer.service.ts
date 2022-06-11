import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentCustomer } from './entities/rentCustomer.entity';

@Injectable()
export class RentCustomerService {
  constructor(
    @InjectRepository(RentCustomer)
    private readonly rentCustomerRepository: Repository<RentCustomer>,
  ) {}

  async findAll() {
    return await this.rentCustomerRepository.find({
      relations: ['rent'],
    });
  }

  async findOne({ rentCustomerId }) {
    return await this.rentCustomerRepository.findOne({
      where: { id: rentCustomerId },
      relations: ['rent'],
    });
  }

  async create({ currentEmail, email, createRentCustomerInput }) {
    const { rentId, ...contents } = createRentCustomerInput;
    const user = await this.rentCustomerRepository.findOne({
      where: { email: currentEmail }, // 이미 숙소후기를 등록한 유저 에러 던지기
    });
    if (user) throw new ConflictException('이미 숙소후기를 등록하였습니다.');

    return await this.rentCustomerRepository.save({
      ...contents,
      email,
      rent: { id: rentId },
    });
  }

  async update({ updateRentCustomerInput }) {
    const { rentId, ...result } = updateRentCustomerInput;
    const review = await this.rentCustomerRepository.findOne({
      where: { rent: rentId },
    });
    console.log(review, 'BBB');
    const newReview = {
      ...review,
      ...result,
    };
    console.log(newReview, 'AAA');
    return await this.rentCustomerRepository.save(newReview);
  }

  async delete({ email, currentEmail }) {
    const result = await this.rentCustomerRepository.delete({
      email: currentEmail,
    });
    return result.affected ? true : false;
  }
}
