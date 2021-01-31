import { Client, MessageEmbed } from 'discord.js';
import { getRepository } from 'typeorm';
import { User } from './entity/user';
import { GlobalUser } from './entity/globalUser';

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
  const gUserRepo = getRepository(GlobalUser);
  const user = await userRepo.findOne({ Id: message.author.id, ServerId: message.guild.id });
  const gUser = await gUserRepo.findOne(message.author.id);
  let xpGain = Math.ceil(message.content.length * 10);
  const timeout = xpTimeout.get(message.author.id);
  // if above 10, add 10
  if (xpGain > 11) {
    xpGain = Math.ceil(+10);
  }
  if (!gUser) {
    const newGUser = new GlobalUser();
    newGUser.Avatar = message.author.displayAvatarURL({ dynamic: true });
    newGUser.Id = message.author.id;
    newGUser.Tag = message.author.tag;
    gUserRepo.save(newGUser);
  } else {
    if (gUser.Premium) xpGain *= 2;
    if (!timeout) {
      if (!user) {
        const newUser = new User();
        newUser.Id = message.author.id;
        newUser.ServerId = message.guild.id;
        newUser.Avatar = message.author.displayAvatarURL({ dynamic: true });
        newUser.Tag = message.author.tag;
        newUser.Xp = xpGain;
        newUser.Tag = message.author.tag;
        userRepo.save(newUser);
      } else if (user.Xp + xpGain >= Math.round(user.Level * 250 * 1.5)) {
        const gain = Math.round(user.Level * 250 * 1.5) - (user.Xp + xpGain);
        console.log(gain);
        user.Id = message.author.id;
        user.ServerId = message.guild.id;
        user.Avatar = message.author.displayAvatarURL({ dynamic: true });
        user.Tag = message.author.tag;
        user.Xp = gain;
        user.Level += 1;

        const embed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle(`Level up  to ${user.Level}`)
          .setTimestamp();
        message.say(embed);

        userRepo.save(user);
      } else {
        user.Id = message.author.id;
        user.ServerId = message.guild.id;
        user.Avatar = message.author.displayAvatarURL({ dynamic: true });
        user.Tag = message.author.tag;
        user.Xp += xpGain;

        xpTimeout.set(message.author.id, '1');
        setTimeout(() => {
          xpTimeout.delete(message.author.id);
        }, 5 * 1000);
        userRepo.save(user);
      }
    }
  }
}
