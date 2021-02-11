import { Message, MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getRepository } from 'typeorm';
import { Guild } from '../../entity/guild';

export default class ItemMetaCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'shop',
      group: 'currency',
      memberName: 'shop',
      description: 'display the server ItemMeta',
      throttling: {
        usages: 2,
        duration: 20,
      },
    });
  }

  public async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const GuildRepo = getRepository(Guild);
    const guild = await GuildRepo.findOne({ where: { id: message.guild.id }, relations: ['shop'] });

    if (!guild) {
      throw new Error('Could not find guild in the database. please report this in the support server');
    }

    const embed = new MessageEmbed();
    guild.shop.forEach((item) => {
      embed.addField(item.name, `${item.description}\nPrice: ${item.price}\nMax: ${item.max}`);
    });

    return message.channel.send(embed);
  }
}
