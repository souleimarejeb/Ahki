import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.model";
import { UserEntity } from "../user.entity";
import moment from "moment";
import { InviteRedemptionEntity } from "./invite_redemption.entities";

@Entity('invite')
export class InviteEntity extends BaseEntity {

    @Column({ default: Date.now().toString() })
    code: string;

    @Column()
    expiration_date: Date;

    @OneToMany(() => InviteRedemptionEntity, (inviteRedemption) => inviteRedemption.invite)
    invite_redemption: InviteRedemptionEntity[];

    @ManyToOne(() => UserEntity, (user) => user.invites)
    user: UserEntity;

    @BeforeInsert()
    generateExpirationDate() {
        this.expiration_date = moment().add('hour', 19).toDate();
    }
}




