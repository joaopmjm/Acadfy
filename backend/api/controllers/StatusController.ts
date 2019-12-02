import * as Package from 'pjson';
import { Controller, Get, BaseRequest, BaseResponse } from 'ts-framework';

@Controller()
export default class StatusController {
  static STARTED_AT = Date.now();

  @Get('/')
  static async getStatus(req: BaseRequest, res: BaseResponse) {
    res.success({
      name: Package.name,
      version: Package.version,
      environment: process.env.NODE_ENV || 'development',
      uptime: Date.now() - StatusController.STARTED_AT,
    });
  }
}
