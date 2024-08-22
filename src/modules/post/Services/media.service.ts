import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from 'src/common/models/db/Posts/media.entities';
import { IMediaInterface } from 'src/common/models/Interfaces/mediaInterface';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class MediaService {
    constructor(@InjectRepository(MediaEntity) private mediaRepository: Repository<MediaEntity>,
    ) { }
    create(mediaDetails: IMediaInterface) {
        const newMedia = this.mediaRepository.create({
            ...mediaDetails,

        });
        return this.mediaRepository.save(newMedia)
    }

    findAll() {
        return this.mediaRepository.find();
    }

    findOne(id: string) {
        return this.mediaRepository.findBy({ id });
    }

    update(id: string, mediaUpdate: Partial<IMediaInterface>) {
        return this.mediaRepository.update({ id }, { ...mediaUpdate });
    }

    remove(id: string) {
        return this.mediaRepository.delete({ id });
    }
}
