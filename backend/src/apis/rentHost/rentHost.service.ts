import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentHost } from './entities/rentHost.entity';

@Injectable()
export class RentHostService {
  constructor(
    @InjectRepository(RentHost)
    private readonly rentHostRepository: Repository<RentHost>,
  ) {}

  async findAll() {
    return await this.rentHostRepository.find({});
  }

  async findOne({ rentHostId }) {
    return await this.rentHostRepository.findOne({
      id: rentHostId,
    });
  }

  async create({ email, createRentHostInput, currentEmail }) {
    const user = await this.rentHostRepository.findOne({
      where: { email: currentEmail }, // 이미 숙소호스트 등록한 유저 에러 던지기
    });
    if (user) throw new ConflictException('이미 호스트로 등록되어있습니다.');

    const result = await this.rentHostRepository.save({
      ...createRentHostInput,
      email,
    });

    return result;
  }

  async update({ rentHostId, updateRentHostInput }) {
    const rentHost = await this.rentHostRepository.findOne({
      where: { id: rentHostId },
    });

    const newRentHost = {
      ...rentHost,
      ...updateRentHostInput,
    };

    return await this.rentHostRepository.save(newRentHost);
  }

  async delete({ rentHostId }) {
    const result = await this.rentHostRepository.softDelete({ id: rentHostId });
    return result.affected ? true : false;
  }

  async restoreOne({ rentHostId }) {
    const result = await this.rentHostRepository.restore({ id: rentHostId });
    return result.affected ? true : false;
  }
}
