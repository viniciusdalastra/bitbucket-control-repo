import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DefaultPullRequestsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'from', type: String })
  public from: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'to', type: String })
  public to: string;
}
