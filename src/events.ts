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
  const user = await userRepo.findOne({ id: message.author.id, serverId: message.guild.id });
  const gUser = await gUserRepo.findOne(message.author.id);
  let xpGain = Math.ceil(message.content.length * 10);
  const timeout = xpTimeout.get(message.author.id);
  // if above 10, add 10
  if (xpGain > 11) {
    xpGain = Math.ceil(+10);
  }
  if (!gUser) {
    const newGUser = new GlobalUser();
    newGUser.avatar = message.author.displayAvatarURL({ dynamic: true });
    newGUser.id = message.author.id;
    newGUser.tag = message.author.tag;
    gUserRepo.save(newGUser);
  } else {
    if (gUser.premium) xpGain *= 2;
    if (!timeout) {
      if (!user) {
        const newUser = new User();
        newUser.id = message.author.id;
        newUser.serverId = message.guild.id;
        newUser.avatar = message.author.displayAvatarURL({ dynamic: true });
        newUser.tag = message.author.tag;
        newUser.xp = xpGain;
        userRepo.save(newUser);
      } else if (user.xp + xpGain >= Math.round(user.level * 250 * 1.5)) {
        const gain = Math.round(user.level * 250 * 1.5) - (user.xp + xpGain);
        console.log(gain);
        user.id = message.author.id;
        user.serverId = message.guild.id;
        user.avatar = message.author.displayAvatarURL({ dynamic: true });
        user.tag = message.author.tag;
        user.xp = gain;
        user.level += 1;

        const embed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle(`level up  to ${user.level}`)
          .setTimestamp();
        message.say(embed);

        userRepo.save(user);
      } else {
        user.id = message.author.id;
        user.serverId = message.guild.id;
        user.avatar = message.author.displayAvatarURL({ dynamic: true });
        user.tag = message.author.tag;
        user.xp += xpGain;

        xpTimeout.set(message.author.id, '1');
        setTimeout(() => {
          xpTimeout.delete(message.author.id);
        }, 5 * 1000);
        userRepo.save(user);
      }
    }
  }
}
