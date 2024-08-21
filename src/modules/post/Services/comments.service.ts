import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsEntity } from 'src/common/models/db/Posts/comments.entities';
import { IComments } from 'src/common/models/Interfaces/commentInterface';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentsEntity) private commentRepository: Repository<CommentsEntity>,
    ) { }
    create(commentDetails: IComments) {
        const newComment = this.commentRepository.create({
            ...commentDetails,

        });
        return this.commentRepository.save(newComment)
    }

    findAll() {
        return this.commentRepository.find();
    }

    findOne(id: string) {
        return this.commentRepository.findBy({ id });
    }

    update(id: string, updateComment: Partial<IComments>) {
        return this.commentRepository.update({ id }, { ...updateComment });
    }

    remove(id: string) {
        return this.commentRepository.delete({ id });
    }
}
