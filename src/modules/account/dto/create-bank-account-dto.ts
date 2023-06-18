import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBankAccountDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
