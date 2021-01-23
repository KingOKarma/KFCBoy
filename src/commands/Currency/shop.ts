import { Message, MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getRepository } from 'typeorm';
import { shop } from '../../entity/item';

export default class shopCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'shop',
      group: 'currency',
      memberName: 'shop',
      description: 'display the server shop',
      throttling: {
        usages: 2,
        duration: 20,
      },
    });
  }

  public async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const shopRepo = getRepository(shop);
    const items = await shopRepo.find({ Id: message.guild.id });
    let guildIcon = message.guild.iconURL({ dynamic: true });
    if (guildIcon == null) guildIcon = 'https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png';
    const embed = new MessageEmbed()
      .setThumbnail(guildIcon);
    console.log(items);
    items.forEach((item) => {
      embed.addField(item.Name, `Desc: ${item.Description}\nPrice: ${item.Price}\nMax count: ${item.Max}`);
    });
    return message.channel.send(embed);
  }
}
