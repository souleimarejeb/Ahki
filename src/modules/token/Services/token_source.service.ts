import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenSourceEntity } from 'src/common/models/db/Token/tokenSource.entity';
import { ITokenSource } from 'src/common/models/Interfaces/tokenSourceInterface';

@Injectable()
export class TokenSourceService {
    constructor(@InjectRepository(TokenSourceEntity) private tokenSourceRepository: Repository<TokenSourceEntity>,
    ) { }

    create(tokenSourceDetails: ITokenSource) {
        const newTokenSrc = this.tokenSourceRepository.create({
            ...tokenSourceDetails,
        });
        return this.tokenSourceRepository.save(newTokenSrc)
    }

    findAll() {
        return this.tokenSourceRepository.find();
    }

    findOne(id: string) {
        return this.tokenSourceRepository.findBy({ id });
    }

    update(id: string, updatetokenSource: Partial<ITokenSource>) {
        return this.tokenSourceRepository.update({ id }, { ...updatetokenSource });
    }

    remove(id: string) {
        return this.tokenSourceRepository.delete({ id });
    }
}
