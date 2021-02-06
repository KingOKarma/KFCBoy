import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { ItemMeta } from '../../entity/metadata';
import { Guild } from '../../entity/guild';

export default class newShopCommand extends commando.Command {
  constructor(client: commando.Client) {
    super(client, {
      name: 'newshop',
      memberName: 'newshop',
      group: 'testing',
      description: 'create new shop with items (Testing)',
    });
  }

  async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const conn = getConnection();
    const guild = await conn.getRepository(Guild).findOne(message.guild.id);

    if (!guild) {
      const newItem = new ItemMeta();
      newItem.name = 'testing item';
      newItem.id = message.guild.id;
      newItem.description = 'testing item';
      newItem.max = 1;
      newItem.price = 100;

      conn.manager.save(newItem);

      const newGuild = new Guild();
      newGuild.id = message.guild.id;
      newGuild.name = message.guild.name;
      newGuild.shop = [newItem];
    }

    return message.say('dick pics on the way');
  }
}
