import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryColumn()
  guild!: string;

  @Column('simple-json', { nullable: true })
  settings!: object;
}
