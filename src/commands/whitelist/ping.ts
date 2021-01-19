import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';

// Creates a new class (being the command) extending off of the commando client
export default class PingCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'pong',
      // This is the group the command is put in
      group: 'group1',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'pong',
      description: 'PONG',
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
    msg: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    // Responds with whatever the user has said.
    // return if null
    return msg.say('PONG 🏓');
  }
}
