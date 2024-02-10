import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class MergeDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'merge_strategy',
    type: String,
    default: 'merge_commit',
  })
  merge_strategy: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'message',
    type: String,
  })
  message: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'type',
    type: String,
  })
  type: string;
}
