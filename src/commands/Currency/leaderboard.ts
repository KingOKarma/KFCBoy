import { Message, MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getRepository } from 'typeorm';
import { User } from '../../entity/user';
import { paginate } from '../../utils';

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
    const users = await userRepo.find({ order: { Nuggies: 'DESC' } });
    const pageNum = 1;
    const page = paginate(users, 10, pageNum);
    const embed = new MessageEmbed();
    page.forEach((user) => {
      embed.addField(user.Tag, user.Nuggies);
    });
    return message.say(embed);
  }
}
