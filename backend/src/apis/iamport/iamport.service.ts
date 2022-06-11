import {
  Injectable,
  HttpException,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async getToken() {
    // 다른 외부에 API에 요청할 때에는 try, catch로 묶어주면 발생한 error를 잡을 수 있다.
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IMP_KEY,
        imp_secret: process.env.IMP_SECRET,
      });
      console.log(result.data.response.access_token, 'AAAA');
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException( // 플레이 그라운드는 정상인것처럼 보이니까, 프론트엔드에 에러메시지를 보내기 위함.
        error.response.data.message, // 아임포트에서 준 에러메시지를 반환
        error.response.status,
      );
    }
  }

  async checkPaid({ imp_uid, price, token }) {
    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${imp_uid}`,
        {
          headers: { Authorization: token },
        },
      );
      console.log(result, 'BBBB');
      if (result.data.response.status !== 'paid')
        // 아임포트에서 결제 정보를 불러오지 못하면, 사용하게 될 로직!
        throw new ConflictException('결제 내역이 존재하지 않습니다.');

      if (result.data.response.amount !== price)
        throw new UnprocessableEntityException('결제 금액이 잘못되었습니다.');

      console.log(result.data.response.amount);
    } catch (error) {
      if (error?.response?.data?.message) {
        // 물음표를 붙여줘야 한다.
        throw new HttpException( // 플레이 그라운드는 정상인것처럼 보이니까, 프론트엔드에 에러메시지를 보내기 위함.
          error.response.data.message, // 아임포트에서 준 에러메시지를 반환
          error.response.status,
        );
      } else {
        //
        throw error; // catch에 들어간 error를 그대로 보내준다는 뜻
      }
    }
  }

  async cancel({ imp_uid, token }) {
    try {
      const result = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        { imp_uid: imp_uid },
        { headers: { Authorization: token } },
      );
      return result.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException( // 플레이 그라운드는 정상인것처럼 보이니까, 프론트엔드에 에러메시지를 보내기 위함.
        error.response.data.message, // 아임포트에서 준 에러메시지를 반환
        error.response.status,
      );
    }
  }
}
