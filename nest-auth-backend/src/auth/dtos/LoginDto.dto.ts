import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email field is required' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password field is required' })
  readonly password: string;
}
