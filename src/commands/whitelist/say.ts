import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
// Creates a new class (being the command) extending off of the commando client
export default class sayCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'say',
      // Creates aliases
      aliases: ['s', 'sentence'],
      // This is the group the command is put in
      group: 'group1',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'say',
      description: 'I can say whatever the user wants!',
      // Ratelimits the command usage to 3 every 5 seconds
      throttling: {
        usages: 3,
        duration: 5,
      },
      // Checks if bot has delete message perms
      clientPermissions: ['MANAGE_MESSAGES'],
      // Makes commands only avalabie within the guild
      guildOnly: true,
      // These are your arguments
      args: [
        {
          key: 'args1',
          prompt: 'Give me something good to say!',
          type: 'string',
        },
      ],
    });
  }

  // Now to run the actual command, the run() parameters need to be defiend (by types and names)
  public async run(
    msg: commando.CommandoMessage,
    { args1 }: { args1: string },
  ): Promise<Message | Message[]> {
    // Deletes command usage
    msg.delete();
    // Responds with whatever the user has said.
    return msg.say(args1);
  }
}
