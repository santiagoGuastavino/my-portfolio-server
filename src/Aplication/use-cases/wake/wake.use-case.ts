import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto, ResponseMessage } from 'src/Aplication/dtos';

@Injectable()
export class WakeUseCase {
  public wakeUp(): ResponseDto<object> {
    const response = new ResponseDto<object>(HttpStatus.OK, ResponseMessage.OK);
    return response;
  }
}
