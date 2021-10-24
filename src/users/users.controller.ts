import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from '../addresses/entities/address.entity';
import { PaginatorDto } from './dto/paginator.dto';
import { NotFoundInterceptor } from '../404.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginatorDto: PaginatorDto) {
    return this.usersService.paginate(paginatorDto);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
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
