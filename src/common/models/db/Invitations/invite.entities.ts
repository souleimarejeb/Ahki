import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.model";
import { UserEntity } from "../user.entity";
import { InviteRedmptionEntity } from "./invite_redemption.entities";
import moment from "moment";

@Entity('invite')
export class InviteEntity extends BaseEntity {

    @Column({ default: Date.now().toString() })
    code: string;

    @Column()
    expiration_date: Date;

    @OneToMany(() => InviteRedmptionEntity, (inviteRedemption) => inviteRedemption.invite)
    invite_redemption: InviteRedmptionEntity[];

    @ManyToOne(() => UserEntity, (user) => user.invites)
    user: UserEntity;

    @BeforeInsert()
    generateExpirationDate() {
        this.expiration_date = moment().add('hour', 19).toDate();
    }
}




