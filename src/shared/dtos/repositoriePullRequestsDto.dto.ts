import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { RepositorieDefaultDto } from './repositorieDefault.dto';

export class RepositoriePullRequestsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'from', type: String })
  public from: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'to', type: String })
  public to: string;
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ name: 'repositorie', type: RepositorieDefaultDto })
  public repositorie: RepositorieDefaultDto;
}
