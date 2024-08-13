import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.model";
import { UserEntity } from "../user.entity";
import { InviteRedmptionEntity } from "./invite_redemption.entities";

@Entity('invite')
export class InviteEntity extends BaseEntity {

    @Column({ default: '' })
    code: number;

    @Column()
    expiration_date: Date;

    @OneToMany(() => InviteRedmptionEntity, (inviteRedemption) => inviteRedemption.invite)
    invite_redemption: InviteRedmptionEntity[];

    @ManyToOne(() => UserEntity, (user) => user.invites)
    user: UserEntity;


    // @BeforeInsert()
    // generateExpirationDate() {
    //     this.expiration_date = this.created_at.getHours+19;
    // }
}




