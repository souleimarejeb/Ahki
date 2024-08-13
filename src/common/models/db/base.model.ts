/**
 * @description
 * This entity is used to hold the common fields
 * across all created models.
 * This entity must be extended by all other models
 */

import { BeforeInsert, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, } from 'typeorm';


@Entity('base_entity')
export class BaseEntity {
    @PrimaryColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    generateID() {
        this.id = generateID();
    }
}

/**
 * This method is used to generate an ID
 * based on the current timestamp and a random number
 * EZxample: vaga|1654616456345634
 * @returns {string}
 */
export function generateID() {
    return 'vaga|' + Date.now().toString() + Math.floor(Math.random() * 1000);
}
