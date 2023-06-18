import { Body, Controller, Post } from '@nestjs/common';
import { CreateBankAccountService } from '../../services/create-bank-account/create-bank-account.service';
import { CreateBankAccountDto } from '../../dto/create-bank-account-dto';

@Controller('account')
export class AccountController {
  constructor(private createAccountService: CreateBankAccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateBankAccountDto) {
    const account = await this.createAccountService.execute(
      createAccountDto.userId,
    );
    return account;
  }
}
