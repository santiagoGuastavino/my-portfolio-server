import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto, ResponseMessage } from './common/dtos/response.dto';

@Injectable()
export class AppService {
  public wakeUp(): ResponseDto<object> {
    const response = new ResponseDto<object>(HttpStatus.OK, ResponseMessage.OK);
    return response;
  }
}
