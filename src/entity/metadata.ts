import { Entity, PrimaryColumn, Column } from 'typeorm';

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
}
