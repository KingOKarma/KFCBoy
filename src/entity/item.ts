import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class shop {
  @PrimaryColumn()
  Id!: string;

  @Column()
  Name!: string;

  @Column()
  Price!: number;

  @Column()
  Description!: string;

  @Column()
  Max!: number;
}
