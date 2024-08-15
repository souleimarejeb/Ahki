import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteEntity } from 'src/common/models/db/Invitations/invite.entities';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class InviteService {
    constructor(@InjectRepository(InviteEntity) private inviteRepository: Repository<InviteEntity>,
    ) { }
    create(inviteDetails: IInvite) {
        const newInvite = this.inviteRepository.create({
            ...inviteDetails,

        });
        return this.inviteRepository.save(newInvite)
    }

    findAll() {
        return this.inviteRepository.find();
    }

    findOne(id: string) {
        return this.inviteRepository.findBy({ id });
    }

    update(id: string, updateInvite: Partial<IInvite>) {
        return this.inviteRepository.update({ id }, { ...updateInvite });
    }

    remove(id: string) {
        return this.inviteRepository.delete({ id });
    }


}
