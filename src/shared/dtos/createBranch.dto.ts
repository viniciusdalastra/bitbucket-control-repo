import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class TargetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'hash', type: String })
  public hash: string;
}

export class CreateBranchDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'name', type: String })
  public name: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ name: 'target', type: TargetDto })
  public target: TargetDto;
}
