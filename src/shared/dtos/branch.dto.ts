import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BranchNameDto } from './branchName.dto';

export class BranchDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'branch', type: Object })
  public branch: BranchNameDto;
}
