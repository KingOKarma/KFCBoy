import { Message, MessageAttachment } from 'discord.js';
import * as commando from 'discord.js-commando';
import { getRepository } from 'typeorm';
import * as Canvas from 'canvas';
import * as path from 'path';
import { User } from '../../entity/user';

export default class levelCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'level',
      aliases: ['lv', 'xp'],
      // This is the group the command is put in
      group: 'xp',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'level',
      description: 'check your level status with this command',
      // Ratelimits the command usage to 3 every 5 seconds
      throttling: {
        usages: 1,
        duration: 5,
      },
    });
  }

  public async run(
    message: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ Id: message.author.id, ServerId: message.guild.id });
    if (!user) return message.say('soo umm this isnt suposed to happen only in testing... an error happened');
    let procent = user.Xp / (user.Level * 250 * 1.5);
    procent *= 100;
    if (Number.isNaN(procent)) procent = 0;
    const canvas = Canvas.createCanvas(700, 250);

    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(path.join(__dirname, '../../images/levelBackground.png'));

    const lineFill = Math.round((400 * procent) / 100);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Select the font size and type from one of the natively available fonts
    ctx.font = '50px sans-serif';
    // Select the style that will be used to fill the text in
    ctx.fillStyle = '#ffffff';
    // Actually fill the text with a solid color
    ctx.fillText(message.author.username, canvas.width / 2.8, canvas.height / 2.4);

    ctx.font = '34px sans-serif';

    ctx.fillText(`level: ${user.Level}`, canvas.width / 2.8, canvas.height / 1.63);

    ctx.font = '12px sans-serif';
    ctx.fillText(`${user.Xp}/${Math.round(user.Level * 250 * 1.5)}`, 250, 179);

    ctx.fillStyle = '#808080';
    ctx.fillRect(250, 180, 400, 30);
    ctx.fillStyle = '#446ffc';
    ctx.fillRect(250, 180, lineFill, 30);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 220, 200);

    const image = new MessageAttachment(canvas.toBuffer(), 'levelImage.png');

    return message.say(image);
  }
}
