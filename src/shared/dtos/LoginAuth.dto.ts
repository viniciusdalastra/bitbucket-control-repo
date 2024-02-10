import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'login', type: String })
  public login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'password', type: String })
  public password: string;
}
