import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class RepositorieDefaultDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'name', type: String })
  public name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'uuid', type: String })
  public uuid: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'workspace', type: String })
  public workspace: string;
}
