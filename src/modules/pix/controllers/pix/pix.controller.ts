import { Body, Controller, Post } from '@nestjs/common';
import { MakeTransferDto } from '../../dto/make-transfer-dto/make-transfer-dto';
import { MakeTransferService } from '../../services/make-transfer/make-transfer.service';

@Controller('pix')
export class PixController {
  constructor(private makeTransferService: MakeTransferService) {}

  @Post()
  create(@Body() data: MakeTransferDto) {
    const transfer = this.makeTransferService.execute(data);
    return transfer;
  }
}
