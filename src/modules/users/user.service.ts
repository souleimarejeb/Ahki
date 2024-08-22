import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/models/db/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { IUsers } from 'src/common/models/Interfaces/UserInterface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) { }

  create(payload: Partial<IUsers>) {

    try {
      const newUser = this.userRepository.create({ ...payload });
      return this.userRepository.save(newUser)

    } catch (error) {
      console.error(error);
    }

  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: string) {
    try {
      return this.userRepository.findBy({ id });
    } catch (error) {
      console.error(error);
    }
  }

  update(id: string, payload: Partial<IUsers>) {
    try {
      return this.userRepository.update({ id }, { ...payload });
    } catch (error) {
      console.error(error);
    }
  }

  remove(id: string) {
    try {
      return this.userRepository.delete({ id });
    } catch (error) {
      console.error(error);
    }
  }
}
