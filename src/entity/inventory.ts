/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/member-ordering */
import {
    Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import { ItemMeta } from "./item";
import { User } from "./user";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    uid!: string;

    @Column()
    serverid!: string;

    @ManyToOne(() => User, (user) => user.id)
    user!: User;

    @Column("simple-json")
    items!: ItemMeta[];
}
