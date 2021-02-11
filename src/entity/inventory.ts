import {
  Column, Entity, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { ItemMeta } from './item';
import { User } from './user';

@Entity()
export class Inventory {
   // eslint-disable-next-line no-shadow
   @PrimaryColumn()
   id!: number;

   @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @Column('simple-json')
  items!: Map<ItemMeta, Number>;
}
