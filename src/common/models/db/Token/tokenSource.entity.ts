import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base.model";
import { TokenHistoryEntity } from "./tokenHistory.entity";

@Entity('token_source')
export class TokenSourceEntity extends BaseEntity {

    @Column({ default: '', unique: true })
    label: string;

    @Column({ default: 0 })
    value: number;

    @OneToMany(() => TokenHistoryEntity, (tokenHistory) => tokenHistory.tokensource)
    tokenHistory: TokenHistoryEntity[];
}

