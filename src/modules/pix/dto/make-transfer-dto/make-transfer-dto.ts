import { IsNotEmpty } from 'class-validator';

export class MakeTransferDto {
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  receiverCode: string;

  @IsNotEmpty()
  shipperCode: string;
}
