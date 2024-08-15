import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionsEntity } from 'src/common/models/db/Posts/reactions.entities';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ReactionService {
    constructor(@InjectRepository(ReactionsEntity) private reactiontRepository: Repository<ReactionsEntity>,
    ) { }
    create(reactionDetails: IReactions) {
        const newReaction = this.reactiontRepository.create({
            ...reactionDetails,

        });
        return this.reactiontRepository.save(newReaction)
    }

    findAll() {
        return this.reactiontRepository.find();
    }

    findOne(id: string) {
        return this.reactiontRepository.findBy({ id });
    }

    update(id: string, updatereaction: Partial<IReactions>) {
        return this.reactiontRepository.update({ id }, { ...updatereaction });
    }

    remove(id: string) {
        return this.reactiontRepository.delete({ id });
    }
}
