import { IsNotEmpty } from 'class-validator';

export class MakeTransferDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  value: number;
}
