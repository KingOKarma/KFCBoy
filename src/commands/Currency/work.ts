import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { User } from '../../entity/user';

export default class WorkCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'work',
      group: 'currency',
      memberName: 'world',
      description: 'work your ass off with this command',
      throttling: {
        usages: 4,
        duration: 60 * 30,
      },
    });
  }

  public async run(
    message: commando.CommandoMessage,
    { args1 }: {args1: string},
  ): Promise<Message | Message[]> {
    const userRepo = getConnection().getRepository(User);
    var user = userRepo.findOne(message.author.id);
  }
}
