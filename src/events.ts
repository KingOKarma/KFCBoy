import { Client, MessageEmbed } from 'discord.js';
import { CommandoMessage } from 'discord.js-commando';
import { getRepository } from 'typeorm';
import { User } from './entity/user';

export function onReady(bot: Client) {
  if (!bot.user) {
    return;
  }
  console.log(`${bot.user.tag} is online!`);
  bot.user.setActivity('... always watching...', { type: 'WATCHING' });
}

export async function onMessage(bot: Client, message: CommandoMessage) {
  const userRepo = getRepository(User);
  const user = await userRepo.findOne(message.author.id);
  let xpGain = Math.ceil(message.content.length / 2);
  // if above 10, add 10
  if (xpGain > 11) {
    xpGain = Math.ceil(+10);
  }

  if (!user) {
    const newUser = new User();
    newUser.Id = message.author.id;
    newUser.ServerId = message.guild.id;
    newUser.Avatar = message.author.displayAvatarURL({ dynamic: true });
    newUser.Tag = message.author.tag;
    newUser.Xp = xpGain;
    userRepo.save(newUser);
  } else if (user.Xp + xpGain >= user.Level + user.Level * 200 * 2) {
    user.Level += 1;
    user.
  }
}
