import 'reflect-metadata';
import { Client } from 'discord.js-commando';
import path from 'path';
import { createConnection } from 'typeorm';
import { onMessage, onReady } from './events';
import { CONFIG } from './globals';

async function main() {
  await createConnection();
  const bot = new Client({
  // My choses prefix is "c." you can choose anything you want!
    commandPrefix: 'd!',
    owner: CONFIG.owners,

  });
  // Runs the function defined in ./events
  bot.on('ready', () => onReady(bot));
  bot.on('message', (message) => onMessage(bot, message));
  // registers all groups/commands/etc
  bot.registry.registerGroups([
    ['group1'],
    ['testing', 'group for testing purposes'],
    ['currency', 'Currency Module'],
    ['xp', 'Xp Module'],
  ]).registerDefaults()
    .registerCommandsIn(
      path.join(__dirname, 'commands'),
    );

  await bot.login(CONFIG.token);
}

main().catch(console.error);
