import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GoogleAuthDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email!: string;

  @IsString({ message: 'Please enter a valid name' })
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'Please enter a valid picture URL' })
  picture?: string;
}
