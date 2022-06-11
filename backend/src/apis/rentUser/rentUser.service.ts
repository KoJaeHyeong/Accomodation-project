import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentUser } from './entities/rentUser.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RentUserService {
  constructor(
    @InjectRepository(RentUser)
    private readonly rentUserRepository: Repository<RentUser>,
  ) {}

  async findAll() {
    return await this.rentUserRepository.find({});
  }

  async findOne({ email }) {
    return await this.rentUserRepository.findOne({
      where: { email },
    });
  }

  async create({ createRentUserInput }) {
    const { email, ...userInfo } = createRentUserInput;

    const user = await this.rentUserRepository.findOne({ email });
    if (user) throw new ConflictException('이미 가입했자나!! 정신차려!!');

    return await this.rentUserRepository.save({
      ...userInfo, // 해쉬패스워드가 같이 들어있다.
      email: email,
    });
  }

  // createinput 바꿔면서 다시 고치자!

  async update({ currentEmail, email, originalPassword, updateRentUserInput }) {
    const rentUser = await this.rentUserRepository.findOne({
      where: { email: currentEmail }, // email이 아니라 토큰안에 있는 이메일을 확인한다. 왜? 인가니까
      relations: ['rent'],
    });
    const isAuthEmail = rentUser.email;

    if (isAuthEmail !== email)
      // 이메일 인증 확인
      throw new UnprocessableEntityException('이메일 틀렸어 임마!!');

    const isAuth = await bcrypt.compare(originalPassword, rentUser.password); // 비밀번호 인증 확인
    if (!isAuth) throw new UnprocessableEntityException('암호틀렸어 임마!!');

    updateRentUserInput.password = await bcrypt.hash(
      updateRentUserInput.password, // 내가 바꾼 비밀번호를 해시해주는 과정!!
      10,
    ); // 새로 해시 패스워드 생성
    const newRent = {
      ...rentUser,
      ...updateRentUserInput, // rentUser의 key,value값에 밑에 인풋값이 덮어쓴다. 순서 중요
    };

    return await this.rentUserRepository.save(newRent);
  }

  async delete({ email }) {
    const result = await this.rentUserRepository.softDelete({ email });
    return result.affected ? true : false;
  }
}
