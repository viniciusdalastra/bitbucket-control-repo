import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infra/auth/auth.guard';

@Controller('repositorie')
@ApiBearerAuth()
export class RepositorieController {
  constructor() {}

  @Get()
  @UseGuards(LocalAuthGuard)
  get() {
    return 'boa';
  }
}
