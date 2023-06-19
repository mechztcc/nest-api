import { Body, Controller, Get, Post } from '@nestjs/common';
import { MakeTransferDto } from '../../dto/make-transfer-dto/make-transfer-dto';
import { HistoryUserService } from '../../services/history-user/history-user.service';
import { MakeTransferService } from '../../services/make-transfer/make-transfer.service';

@Controller('pix')
export class PixController {
  constructor(
    private makeTransferService: MakeTransferService,
    private historyUserService: HistoryUserService,
  ) {}

  @Post()
  create(@Body() data: MakeTransferDto) {
    const transfer = this.makeTransferService.execute(data);
    return transfer;
  }

  @Post('history')
  indexBy(@Body() data: any) {
    const { userId } = data;
    const history = this.historyUserService.execute(userId);
    return history;
  }
}
