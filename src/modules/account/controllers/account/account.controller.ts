import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBankAccountService } from '../../services/create-bank-account/create-bank-account.service';
import { CreateBankAccountDto } from '../../dto/create-bank-account-dto';
import { FindByUserService } from '../../services/find-by-user/find-by-user.service';
import { BalanceUserService } from '../../services/balance-user/balance-user.service';
import { IndexService } from '../../services/index/index.service';

@Controller('account')
export class AccountController {
  constructor(
    private createAccountService: CreateBankAccountService,
    private findAccountByUser: FindByUserService,
    private balanceUserService: BalanceUserService,
    private indexAccountService: IndexService,
  ) {}

  @Post()
  async create(@Body() createAccountDto: CreateBankAccountDto) {
    const account = await this.createAccountService.execute(
      createAccountDto.userId,
    );
    return account;
  }

  @Get()
  async index() {
    const account = await this.indexAccountService.execute();

    return account;
  }

  @Get(':id')
  async findByUser(@Param() data: any) {
    const account = await this.findAccountByUser.execute(data.userId);

    return account;
  }

  @Post('/balance')
  async findBalanceByUser(@Body() data: any) {
    const balance = await this.balanceUserService.execute(data.userId);
    return balance;
  }
}
