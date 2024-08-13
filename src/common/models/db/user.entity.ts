import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.model";
import { AddressEntity } from "./address.entity";
import { EnterpriseEntity } from "./enterprise.entity";


@Entity('users_mgmt__user_roles')
export class UserRolesEntity extends BaseEntity {
    @Column({ default: '' })
    role: string;
}

/**
 * @description
 * This entity is used to represent the user
 * This holds a user's basic data (id, dates) along with Authentication_id (Auth0)
 */
@Entity('users_mgmt__user')
export class UserEntity extends BaseEntity {
    @Column({ default: '' })
    authentication_id: string;

    @Column({ default: '' })
    first_name: string;

    @Column({ default: '' })
    last_name: string;

    @Column({ default: '' })
    site: string;

    @Column({ type: 'json' })
    civility: { id: string; civility: string };

    @Column({ default: '' })
    gender: string;

    @Column({ default: '' })
    job_title: string;

    @Column({ default: '' })
    language: string;

    @Column({ default: '' })
    email: string;

    @Column({ default: '' })
    billsEmail: string;

    @Column({ default: '' })
    phone: string;

    @Column({ default: 'Non actif' })
    user_status: string;

    @Column({ default: '' })
    city: string;

    @Column({ default: 'contact_person' })
    user_type: string;

    @Column({ default: 0 })
    isDefault: 0 | 1;

    @Column({ default: false })
    status: boolean;

    @OneToMany(() => AddressEntity, (address) => address.user, { cascade: true })
    @JoinColumn()
    address: AddressEntity[];

    @ManyToMany(() => EnterpriseEntity, (enterprise) => enterprise.sales_agents)
    @JoinTable({
        name: "enterprise_mgmt__sales_agents", // Name of the join table
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "enterprise_id",
            referencedColumnName: "id"
        }
    })
    enterprises: EnterpriseEntity[];

    @ManyToOne(() => UserRolesEntity)
    @JoinColumn()
    user_role: UserRolesEntity;

    @ManyToOne(() => EnterpriseEntity, (enterprise) => enterprise.users, { onDelete: 'CASCADE' })
    @JoinColumn()
    enterprise: EnterpriseEntity;
}

