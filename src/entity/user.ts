import {
  Entity, Column, PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  serverId!: string;

  @Column()
  tag!: string;

  @Column()
  avatar!: string;

  @Column({ default: 100 })
  nuggies!: number;

  @Column({ default: 0 })
  xp!: number;

  @Column({ default: 1 })
  level!: number;

  @Column({ default: 0 })
  netWorth!: number;

  @Column({ default: '' })
  work!: string;
}
