import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { IUsers } from 'src/common/models/Interfaces/UserInterface';

@Controller('users')
@ApiTags('Users MGMT ROUTES')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  create(@Body() payload: Partial<IUsers>) {
    return this.userService.create(payload);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() payload: Partial<IUsers>
  ) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
