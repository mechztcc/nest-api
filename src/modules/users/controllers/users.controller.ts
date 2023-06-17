import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto/create-user-dto';
import { CreateUserService } from '../services/create-user/create-user.service';
import { FindAllUsersServiceService } from '../services/find-all-users-service/find-all-users-service.service';

@Controller('users')
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private findAllUsersService: FindAllUsersServiceService,
  ) {}
  @Post()
  async create(@Body() createUserDTO: CreateUserDto) {
    const users = await this.createUserService.execute(createUserDTO);
    return users;
  }

  @Get()
  async index() {
    const users = await this.findAllUsersService.execute();
    return users;
  }
}
