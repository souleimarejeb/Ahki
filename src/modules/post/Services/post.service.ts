import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { PostEntity } from 'src/common/models/db/Posts/posts.entities';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
    ) { }

    create(postDetails: IPostInterface) {
        const newPost = this.postRepository.create({
            ...postDetails,

        });
        return this.postRepository.save(newPost)
    }

    findAll() {
        return this.postRepository.find();
    }

    findOne(id: string) {
        return this.postRepository.findBy({ id });
    }

    update(id: string, updatePost: Partial<IPostInterface>) {
        return this.postRepository.update({ id }, { ...updatePost });
    }

    remove(id: string) {
        return this.postRepository.delete({ id });
    }
}
