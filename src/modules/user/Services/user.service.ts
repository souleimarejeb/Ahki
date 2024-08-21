import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/models/db/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { IUserInterface } from 'src/common/models/Interfaces/UserInterface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) { }

  create(createUser: IUserInterface) {
    const newUser = this.userRepository.create({
      ...createUser,
    });
    return this.userRepository.save(newUser)
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findBy({ id });
  }

  update(id: string, updateUser: Partial<IUserInterface>) {
    return this.userRepository.update({ id }, { ...updateUser });;
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
