import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.model";
import { UserEntity } from "../user.entity";
import { InviteEntity } from "./invite.entities";

@Entity('invite_redemption')
export class InviteRedemptionEntity extends BaseEntity {

    @ManyToOne(() => UserEntity, (user) => user.inviteRedemption)
    user: UserEntity;
    @ManyToOne(() => InviteEntity, (invite) => invite.invite_redemption)
    invite: InviteEntity;
}

