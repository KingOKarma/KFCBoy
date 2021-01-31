import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getConnection } from 'typeorm';
import { User } from '../../entity/user';

// Creates a new class (being the command) extending off of the commando client
export default class AddMeCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'addme',
      // This is the group the command is put in
      group: 'testing',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'addme',
      description: 'add me test',
      // Ratelimits the command usage to 3 every 5 seconds
      throttling: {
        usages: 3,
        duration: 5,
      },
      // Makes command only usable by owners (set in index.js)
      ownerOnly: true,
    });
  }

  // Now to run the actual command, the run() parameters need to be defiend (by types and names)
  public async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const connection = getConnection();
    const { id } = message.author;

    const newUser = new User();
    newUser.Id = id;
    newUser.ServerId = message.guild.id;
    newUser.Tag = message.author.tag;
    newUser.Avatar = message.author.displayAvatarURL({ dynamic: true });
    newUser.Level = 0;
    newUser.Nuggies = 100;
    newUser.Xp = 0;
    newUser.Tag = message.author.tag;

    connection.manager.save(newUser).then((saved) => {
      console.log('user saved');
      console.log(saved);
    });

    return message.channel.send('done no errors found');
  }
}
