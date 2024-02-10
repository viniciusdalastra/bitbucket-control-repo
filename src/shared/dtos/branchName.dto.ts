import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BranchNameDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'name', type: String })
  public name: string;
}
