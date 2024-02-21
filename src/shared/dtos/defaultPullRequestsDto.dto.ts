import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { BranchDto } from './branch.dto';

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
