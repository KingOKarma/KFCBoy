import { Message, MessageEmbed } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getMember } from '../../utils';

// Creates a new class (being the command) extending off of the commando client
export default class UserInfoCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'userinfo',
      // Creates aliases
      aliases: ['whois', 'member'],
      // This is the group the command is put in
      group: 'group1',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'userinfo',
      description: 'I\'ll give you some info on any user',
      // Ratelimits the command usage to 3 every 5 seconds
      throttling: {
        usages: 3,
        duration: 5,
      },
      // Makes commands only avalabie within the guild
      guildOnly: true,
      // Require's bot to have MANAGE_MESSAGES perms
      clientPermissions: ['MANAGE_MESSAGES'],
      // Require's user to have MANAGE_MESSAGES perms
      userPermissions: ['MANAGE_MESSAGES'],
      // These are your arguments
      args: [
        {
          key: 'memberID',
          prompt: 'I need a member mention, or ID',
          type: 'string',
        },
      ],
    });
  }

  // Now to run the actual command, the run() parameters need to be defiend (by types and names)
  public async run(
    msg: commando.CommandoMessage,
    { memberID }: { memberID: string },
  ): Promise<Message | Message[]> {
    // Responds with whatever the user has said.
    const member = getMember(memberID, msg.guild);

    if (member === undefined) {
      return msg.reply('Sorry I cannot find that user!');
    }

    const embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
      .setTitle('Info')
      .setDescription(`Created account at ${member.user.createdAt.toLocaleString('en-US')}`);

    return msg.say(embed);
  }
}
