import {
  Entity, PrimaryColumn, Column, OneToOne, JoinColumn,
} from 'typeorm';
import { ItemMeta } from './metadata';

@Entity()
export class Guild {
  @OneToOne(() => ItemMeta)
  @JoinColumn()
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: false })
  boosted!: boolean;

  @Column('simple-array', { array: true })
  shop!: ItemMeta[];
}
