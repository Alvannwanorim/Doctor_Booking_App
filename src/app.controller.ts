import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/api')
  public getApp() {
    return 'Ok';
  }
}
