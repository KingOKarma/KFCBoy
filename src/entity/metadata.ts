import {
  Entity, Column, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { Guild } from './guild';
@Entity()
export class ItemMeta {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  max!: number;

  // eslint-disable-next-line no-shadow
  @ManyToOne(() => Guild, (Guild) => Guild.shop)
  guild!: Guild;
}
