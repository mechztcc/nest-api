import { IsNotEmpty } from 'class-validator';

export class CreateBankAccountDto {
  @IsNotEmpty()
  userId: number;
}
