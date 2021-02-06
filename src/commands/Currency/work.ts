import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getRepository } from 'typeorm';
import ms from 'ms';
import { User } from '../../entity/user';
import { CONFIG } from '../../globals';
import { GlobalUser } from '../../entity/globalUser';

const Timeout = new Map();

export default class WorkCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'work',
      group: 'currency',
      memberName: 'world',
      description: 'work your ass off with this command',
      throttling: {
        usages: 4,
        duration: 60 * 30,
      },
    });
  }

  public async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const userRepo = getRepository(User);
    const gUserRepo = getRepository(GlobalUser);
    const user = await userRepo.findOne({ id: message.author.id, serverId: message.guild.id });
    const gUser = await gUserRepo.findOne(message.author.id);
    const found = Timeout.get(message.author.id);

    if (!user) {
      return message.channel.send('whoop eroor ```user not dound error```');
    }
    if (!gUser) {
      return message.channel.send('whoop eroor ```gUser not dound error```');
    }

    if (found) {
      const timeout = 5 * 60 * 1000;
      const timePassed = Date.now() - found;
      const timeLeft = timeout - timePassed;
      return message.say(`**whoa there youre a bit too fast there. you gotta wait ${ms(timeLeft)}!**`);
    }

    // generate earnings and add multipliers
    let earn = Math.floor(Math.random() * 200 - 100) + 100;
    earn *= user.level > 10 ? Math.floor(user.level / 15) : 1;
    if (gUser.premium) earn = Math.floor(earn + 2.1);

    const random = Math.floor(Math.random() * CONFIG.workStrings.length);
    let workString = CONFIG.workStrings[random];
    workString = workString.replace('{bal}', earn.toString());
    workString = workString.replace('{totalBal}', user.nuggies.toString());
    workString = workString.replace('{user}', `<@${message.author.id}>`);

    Timeout.set(message.author.id, Date.now());
    setTimeout(() => {
      Timeout.delete(message.author.id);
      // 5 mins
    }, 5 * 60 * 1000);

    user.nuggies += earn;
    await userRepo.manager.save(user);

    return message.say(workString);
  }
}
