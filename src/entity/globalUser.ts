/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/member-ordering */
import {
    Column, Entity, PrimaryColumn
} from "typeorm";

@Entity()
export class GlobalUser {
    @PrimaryColumn()
    id!: string;

    @Column()
    tag!: string;

    @Column()
    avatar!: string;

    @Column({ default: false })
    premium!: boolean;

    @Column({ nullable: true })
    premiumBought!: string;
}
