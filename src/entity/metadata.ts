import {
  Entity, Column, PrimaryColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Playlist } from './userplaylists';

@Entity()
export class PlaylistMetadata {
  @PrimaryColumn()
  PlaylistId!: number;

  @Column()
  Length!: number;

  // eslint-disable-next-line no-unused-vars
  @OneToOne((type) => Playlist)
  @JoinColumn()
  Playlist!: Playlist;
}
