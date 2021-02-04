import {
  Entity, Column, PrimaryColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Playlist } from './userplaylists';

@Entity()
export class GlobalUser {
  @PrimaryColumn()
  Id!: string;

  @Column()
  Tag!: string;

  @Column()
  Avatar!: string;

  @Column({ default: false })
  Premium!: boolean;

  @Column({ nullable: true })
  PremiumBought!: string;

  @OneToOne(() => Playlist)
  @JoinColumn()
  Playlists!: Playlist[];
}
