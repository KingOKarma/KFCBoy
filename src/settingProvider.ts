import { SettingProvider } from 'discord.js-commando';
import { getConnection } from 'typeorm';

/**
 * Typeorm store settings for guilds
 * @extends {SettingProvider}
 */
class TypeormProvider extends SettingProvider {
  connection: any;

  constructor() {
    super();
    this.connection = getConnection();
  }
  
}
