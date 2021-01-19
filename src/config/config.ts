import fs from 'fs';
import { safeDump, safeLoad } from 'js-yaml';

/**
 * This represents the config.yml
 * @class Config
 * @property {string} token
 * @property {string} prefix
 * @property {string[]} owners
 */
export default class Config {
    public readonly token: string;

    public readonly prefix: string;

    public readonly owners: string[];

    private static LOCATION = './config.yml';

    constructor() {
      this.token = '';
      this.prefix = '';
      this.owners = [''];
    }

    /**
       *  Call getConfig instead of constructor
       */
    public static getConfig(): Config {
      if (!fs.existsSync(Config.LOCATION)) {
        throw new Error('Please create a config.yml');
      }
      const fileContents = fs.readFileSync(
        Config.LOCATION,
        'utf-8',
      );
      const casted = safeLoad(fileContents) as Config;

      return casted;
    }

    /**
   *  Safe the config to the congfig.yml default location
   */
    public saveConfig(): void {
      const serialized = safeDump(this);
      fs.writeFileSync(
        Config.LOCATION,
        serialized,
        'utf8',
      );
    }
}
