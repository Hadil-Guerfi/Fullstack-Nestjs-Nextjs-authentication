import { IsEmail, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'refresh field is required' })
  readonly refresh: string;
}
