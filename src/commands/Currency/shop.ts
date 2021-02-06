import { Message, MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getRepository } from 'typeorm';
import { ItemMeta } from '../../entity/metadata';

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
    const ItemMetaRepo = getRepository(ItemMeta);
    const items = await ItemMetaRepo.find({ id: message.guild.id });
    let guildIcon = message.guild.iconURL({ dynamic: true });
    if (guildIcon == null) guildIcon = 'https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png';
    const embed = new MessageEmbed()
      .setThumbnail(guildIcon);
    console.log(items);
    items.forEach((item) => {
      embed.addField(item.name, `Desc: ${item.description}\nPrice: ${item.price}\nMax count: ${item.max}`);
    });
    return message.channel.send(embed);
  }
}
