import { IsNotEmpty, IsOptional, IsEmail, Length, Matches, IsPositive } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(12, 12)
  aadharNo: string;

  @IsNotEmpty()
  @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { 
    message: 'PAN must be in format ABCDE1234F' 
  })
  panCard: string;

  @IsNotEmpty()
  fathersName: string;

  @IsNotEmpty()
  motherName: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Matches(/^[1-9][0-9]{5}$/, { message: 'Invalid Indian pincode' })
  pincode: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  presentAddress: string;

  @IsNotEmpty()
  occupation: string;

  @IsNotEmpty()
  sourceOfIncome: string;

  @IsNotEmpty()
  grossAnnualIncome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be exactly 10 digits' })
  phoneNo: string;
}
