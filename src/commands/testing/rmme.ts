import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { User } from '../../entity/user';

// Creates a new class (being the command) extending off of the commando client
export default class RemoveMeCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'rmme',
      // This is the group the command is put in
      group: 'testing',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'rmme',
      description: 'add me test',
      // Ratelimits the command usage to 3 every 5 seconds
      throttling: {
        usages: 3,
        duration: 5,
      },
      // Makes command only usable by owners (set in index.js)
      ownerOnly: true,
    });
  }

  // Now to run the actual command, the run() parameters need to be defiend (by types and names)
  public async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const userRepo = getConnection().getRepository(User);
    const user = await userRepo.findOne(message.author.id);

    if (user) {
      await userRepo.remove(user);
      return message.channel.send('done no errors found');
    }

    return message.channel.send('you where not found in the database');
  }
}
