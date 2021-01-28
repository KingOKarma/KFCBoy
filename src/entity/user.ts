import {
  Entity, Column, PrimaryColumn, Unique,
} from 'typeorm';

@Entity()
@Unique(['Id'])
export class User {
  @PrimaryColumn()
  Id!: string;

  @Column()
  ServerId!: string;

  @Column()
  Tag!: string;

  @Column()
  Avatar!: string;

  @Column({ default: 100 })
  Nuggies!: number;

  @Column({ default: 0 })
  Xp!: number;

  @Column({ default: 1 })
  Level!: number;

  @Column({ default: 0 })
  NetWorth!: number;

  @Column({ default: '' })
  Work!: string;
}
