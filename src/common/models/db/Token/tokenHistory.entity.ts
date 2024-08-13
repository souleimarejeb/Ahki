import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base.model";
import { TokenSourceEntity } from "./tokenSource.entity";
import { UserEntity } from "../user.entity";

@Entity('token_history')
export class TokenHistoryEntity extends BaseEntity {

    @Column({ default: 0 })
    tokenSourceValue: number;

    @Column()
    dateCreation: Date;

    @Column({ default: 0 })
    totalValue: number;

    @ManyToOne(() => UserEntity, (user) => user.tokenHistories)
    user: UserEntity;


    @ManyToOne(() => TokenSourceEntity, (tokensource) => tokensource.tokenHistory)
    tokensource: TokenSourceEntity;
}

