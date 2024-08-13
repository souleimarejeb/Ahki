import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity } from "./base.model";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity extends BaseEntity {

    @Column({ default: '', unique: true })
    username: string;

    @Column({ default: '' })
    first_name: string;

    @Column({ default: '' })
    last_name: string;

    @Column({ default: '', unique: true })
    email: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ default: 0 })
    tokenBlance: number;

    @Column({ default: true })
    status: boolean;

    @Column({ default: '' })
    links: string;

    @Column()
    idAuthentication: string;
}

