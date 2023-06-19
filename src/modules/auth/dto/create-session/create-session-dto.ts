import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  password: string;
}
