import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { InviteRedemptionEntity } from 'src/common/models/db/Invitations/invite_redemption.entities';


@Injectable()
export class InviteRedemptionService {
    constructor(@InjectRepository(InviteRedemptionEntity) private inviteRedmpRepository: Repository<InviteRedemptionEntity>,
    ) { }
    create(inviteRedmpDetails: IInviteRedemption) {
        const newInviteRedmp = this.inviteRedmpRepository.create({
            ...inviteRedmpDetails,

        });
        return this.inviteRedmpRepository.save(newInviteRedmp)
    }

    findAll() {
        return this.inviteRedmpRepository.find();
    }

    findOne(id: string) {
        return this.inviteRedmpRepository.findBy({ id });
    }

    update(id: string, updateInviteRedmp: Partial<IInviteRedemption>) {
        return this.inviteRedmpRepository.update({ id }, { ...updateInviteRedmp });
    }

    remove(id: string) {
        return this.inviteRedmpRepository.delete({ id });
    }

}
