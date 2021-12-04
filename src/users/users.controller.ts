import { Body, Controller, Get, Param, Patch, Query, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { Address } from '../addresses/entities/address.entity';
import { PaginatorDto } from './dto/paginator.dto';
import { NotFoundInterceptor } from '../404.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() paginatorDto: PaginatorDto) {
    return this.usersService.findAll(paginatorDto);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id/address')
  updateAddress(@Param('id') id: string, @Body() address: Address) {
    return this.usersService.updateAddress(+id, address);
  }

  @Get(':id/address')
  getAddress(@Param('id') id: string) {
    return this.usersService.getAddress(+id);
  }
}
