import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenHistoryEntity } from 'src/common/models/db/Token/tokenHistory.entity';
import { TokenSourceEntity } from 'src/common/models/db/Token/tokenSource.entity';
import { UserEntity } from 'src/common/models/db/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class TokenHistoryService {
    constructor(@InjectRepository(TokenHistoryEntity) private tokenHsitoryRepository: Repository<TokenHistoryEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(TokenSourceEntity) private tokenSrcRepository: Repository<TokenSourceEntity>,

    ) { }
    async create(id: string, tokenHistoryDetails: ITokenHistory) {
        const user = await this.userRepository.findOneBy({ id })
        const tokensource = await this.tokenSrcRepository.find();
        if (!user) throw new HttpException('User not found. Cannot Create Profile ', HttpStatus.BAD_REQUEST);


        const newTokenHistory = this.tokenHsitoryRepository.create({ ...tokenHistoryDetails, });
        const tokenHistory = await this.tokenHsitoryRepository.save(newTokenHistory);

        return tokenHistory

    }

    findAll() {
        return this.tokenHsitoryRepository.find();
    }

    findOne(id: string) {
        return this.tokenHsitoryRepository.findBy({ id });
    }

    update(id: string, updateTokenHistory: Partial<ITokenHistory>) {
        return this.tokenHsitoryRepository.update({ id }, { ...updateTokenHistory });
    }

    remove(id: string) {
        return this.tokenHsitoryRepository.delete({ id });
    }
}
