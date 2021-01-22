import { Message, MessageEmbed } from 'discord.js';
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
  ): Promise<Message | Message[]> {
    const userRepo = await getConnection().getRepository(User);
    const user = await userRepo.findOne(message.author.id);
    if (!user) {
      return message.channel.send('whoop eroor ```user not dound error```');
    }
    // eslint-disable-next-line max-len
    let earn = (Math.floor(Math.random() * 200 - 100) + 100) * (user.Level > 10 ? Math.floor(user.Level / 15) : 1);
    if (user.Premium) earn = Math.floor(earn + 2.1);
    user.Nuggies += earn;
    await userRepo.manager.save(user);
    const embed = new MessageEmbed()
      .setAuthor(user.Tag, user.Avatar)
      .setDescription(`You have earned: ${earn}`)
      .setTimestamp();
    return message.channel.send(embed);
  }
}
