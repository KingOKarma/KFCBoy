import { Client } from 'discord.js';

export function onReady(bot: Client) {
  if (!bot.user) {
    return;
  }
  console.log(`${bot.user.tag} is online!`);
  bot.user.setActivity('... always watching...', { type: 'WATCHING' });
}
