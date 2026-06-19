import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @Transform(({ value }: { value: string }) => value?.trim().toLowerCase())
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email!: string;

  @IsString({ message: 'Please enter a valid password' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
}

