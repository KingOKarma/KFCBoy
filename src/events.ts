import { Client, MessageEmbed } from 'discord.js';
import { getRepository } from 'typeorm';
import { User } from './entity/user';

const xpTimeout = new Map();
export function onReady(bot: Client) {
  if (!bot.user) {
    return;
  }
  console.log(`${bot.user.tag} is online!`);
  bot.user.setActivity('... always watching...', { type: 'WATCHING' });
}

// eslint-disable-next-line consistent-return
export async function onMessage(bot: Client, message: any) {
  if (message.author.bot) return;
  const userRepo = getRepository(User);
  const user = await userRepo.findOne(message.author.id);
  let xpGain = Math.ceil(message.content.length * 10);
  // if above 10, add 10
  if (xpGain > 11) {
    xpGain = Math.ceil(+10);
  }
  const timeout = xpTimeout.get(message.author.id);
  if (!timeout) {
    if (!user) {
      const newUser = new User();
      newUser.Id = message.author.id;
      newUser.ServerId = message.guild.id;
      newUser.Avatar = message.author.displayAvatarURL({ dynamic: true });
      newUser.Tag = message.author.tag;
      newUser.Xp = xpGain;
      return userRepo.save(newUser);
    }

    if (user.Xp + xpGain >= user.Level * 200 * 2) {
      const gain = user.Xp + xpGain - user.Level + user.Level * 200 * 2;

      user.Id = message.author.id;
      user.ServerId = message.guild.id;
      user.Avatar = message.author.displayAvatarURL({ dynamic: true });
      user.Tag = message.author.tag;
      user.Xp += gain;
      user.Level += 1;

      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`Level up  to ${user.Level}`)
        .setTimestamp();
      message.say(embed);

      return userRepo.save(user);
    }

    user.Id = message.author.id;
    user.ServerId = message.guild.id;
    user.Avatar = message.author.displayAvatarURL({ dynamic: true });
    user.Tag = message.author.tag;
    user.Xp += xpGain;

    xpTimeout.set(message.author.id, '1');
    setTimeout(() => {
      xpTimeout.delete(message.author.id);
    }, 5 * 1000);
    return userRepo.save(user);
  }
}
