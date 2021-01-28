import {
  Entity, Column, PrimaryColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Playlist } from './playlists';

@Entity()
export class PlaylistMetadata {
  @PrimaryColumn()
  Id!: string;

  @Column()
  Tag!: string;

  @Column()
  Avatar!: string;

  @OneToOne(() => Playlist)
  @JoinColumn()
  Playlists!: Playlist[];
}
