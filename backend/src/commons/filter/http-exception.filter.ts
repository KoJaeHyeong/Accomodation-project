import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // implements는 extends: 확장와 다르게 구현이라는 뜻 : 직접으로 기능들을 물려받는게 아니라 그 기능들을 만들라는 뜻!
  // catch를 만들어 줘야함
  catch(exception: HttpException) {
    // 타입 적어주는 것
    const status = exception.getStatus(); // 상태코드
    const message = exception.message; // 상태 메시지

    console.log('=============');
    console.log('에러가 발생했어!!');
    console.log('에러내용:', message);
    console.log('에러코드:', status);
    console.log('=============');
  }
}
