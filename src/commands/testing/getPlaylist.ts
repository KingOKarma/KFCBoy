import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getRepository } from 'typeorm';
import { GlobalUser } from '../../entity/globalUser';
import { Playlist } from '../../entity/userplaylists';

export default class playlistCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'playlisttest',
      memberName: 'playlisttest',
      group: 'testing',
      description: 'playlist test',
    });
  }

  public async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const userRepo = getRepository(GlobalUser);
    const user = await userRepo.findOne(message.author.id);
    if (!user) return message.say('too bad LOSER');
    if (!user?.Playlists || user?.Playlists.length === 0) {
      const newPlaylist = new Playlist();
      newPlaylist.Length = 1;
      newPlaylist.Songs = [{ name: 'hello world', length: 128, bitStream: 'testSream' }];
      newPlaylist.name = 'test playlist';
      const playlists = [];
      playlists.push(newPlaylist);
      user.Playlists = playlists;
    }
    console.log(user);
    return message.say('hey');
  }
}
