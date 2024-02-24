import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteBranchDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'name', type: String, required: true })
  public name: string;
  @IsNotEmpty()
  @ApiProperty({ name: 'uuid from repositorie', type: String, required: true })
  public uuid: string;
  @IsNotEmpty()
  @ApiProperty({ name: 'workspace', type: String, required: true })
  public workspace: string;
}
