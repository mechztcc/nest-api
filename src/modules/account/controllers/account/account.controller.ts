import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBankAccountService } from '../../services/create-bank-account/create-bank-account.service';
import { CreateBankAccountDto } from '../../dto/create-bank-account-dto';
import { FindByUserService } from '../../services/find-by-user/find-by-user.service';

@Controller('account')
export class AccountController {
  constructor(
    private createAccountService: CreateBankAccountService,
    private findAccountByUser: FindByUserService,
  ) {}

  @Post()
  async create(@Body() createAccountDto: CreateBankAccountDto) {
    const account = await this.createAccountService.execute(
      createAccountDto.userId,
    );
    return account;
  }

  @Get(':id')
  async findByUser(@Param() data: any) {
    console.log(data);

    const account = await this.findAccountByUser.execute(data.userId);

    return account;
  }
}
