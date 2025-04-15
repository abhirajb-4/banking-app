import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePayeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  confirmAccountNumber: string;

  @IsNotEmpty()
  @IsString()
  ifscCode: string;
}
