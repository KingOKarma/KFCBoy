import { Message, MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { User } from '../../entity/user';

// Creates a new class (being the command) extending off of the commando client
export default class BalCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'balance',
      aliases: ['bal', 'money', 'currency'],
      // This is the group the command is put in
      group: 'currency',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'balance',
      description: 'add me test',
      // Ratelimits the command usage to 3 every 5 seconds
      throttling: {
        usages: 3,
        duration: 5,
      },
    });
  }

  // Now to run the actual command, the run() parameters need to be defiend (by types and names)
  public async run(
    message: commando.CommandoMessage,
    // eslint-disable-next-line no-unused-vars
    { args1 }: {args1: string},
  ): Promise<Message | Message[]> {
    const userRepo = getConnection().getRepository(User);
    const user = await userRepo.findOne(message.author.id);

    if (user) {
      const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Currency')
        .setAuthor(user.Tag, user.Avatar)
        .setDescription(`Balance banked ${user.Nuggies}`)
        .setTimestamp();
      return message.channel.send(embed);
    }

    return message.channel.send('Whoops error ``user not found error```');
  }
}
