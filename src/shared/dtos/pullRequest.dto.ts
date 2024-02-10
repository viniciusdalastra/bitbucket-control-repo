import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { BranchDto } from './branch.dto';

export class PullRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'title', type: String })
  public title: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ name: 'source', type: BranchDto })
  public source: BranchDto;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ name: 'destination', type: BranchDto })
  public destination: BranchDto;
}
