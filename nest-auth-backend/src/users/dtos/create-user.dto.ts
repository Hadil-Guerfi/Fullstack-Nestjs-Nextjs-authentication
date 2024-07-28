import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty({ message: 'Username field is required ' })
  readonly username: string;

  @IsNotEmpty({ message: 'Date field is required ' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate({ message: 'birthdate must be of type dates' })
  readonly birthdate: Date;

  @IsEmail({}, { message: 'incorrect email' })
  @IsNotEmpty({ message: 'Email field is required ' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password field is required ' })
  readonly password: string;
}
