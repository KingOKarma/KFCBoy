/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
import {
  Entity, PrimaryColumn, Column, OneToMany,
} from 'typeorm';
import { ItemMeta } from './item';

@Entity()
export class Guild {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ default: false })
  boosted!: boolean;

  @OneToMany(() => ItemMeta, ItemMeta => ItemMeta.guild)
  shop!: ItemMeta[];
}
