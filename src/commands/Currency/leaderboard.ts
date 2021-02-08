import { Message, MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getRepository } from 'typeorm';
import { User } from '../../entity/user';

export default class leaderboardCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'leaderboard',
      aliases: ['lb'],
      memberName: 'balleaderboard',
      group: 'currency',
      description: 'leaderboads',
      guildOnly: true,
      throttling: {
        usages: 3,
        duration: 30,
      },
    });
  }

  public async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const userRepo = getRepository(User);
    const page = 0;
    const users = await userRepo.find({
      where: [{ serverId: message.guild.id }, { id: message.author.id }],
      order: { serverId: 'DESC', id: 'DESC' },
      skip: page * 10,
      take: 10,
      relations: ['ItemMeta'],
    });
    console.log(users);
    const embed = new MessageEmbed();
    users.forEach((user) => {
      embed.addField(user.tag, user.nuggies);
    });
    return message.say(embed);
  }
}
