const Discord = require("discord.js");
const Canvas = require('canvas');
module.exports = {
	name: 'test',

	run: async (_, message) => {
		if (message.author.id != "406211463125008386") return message.channel.send("This is a Owner only comamnd! <:Kaineshrug:711591140125704242>")


		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');

		Canvas.registerFont('./fonts/Roboto-Regular.ttf', { family: 'fontFamily' });

		const background = await Canvas.loadImage('./wallpaper.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);

		// Slightly smaller text placed above the member's display name
		ctx.font = '28px sans-serif';
		ctx.fillStyle = '#000001';
		ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

		// Add an exclamation point here and below
		ctx.font = applyText(canvas, `${message.member.displayName}!`);
		ctx.fillStyle = '#000001';
		ctx.fillText(`${message.member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

		message.channel.send(`Welcome to the server, ${message.member}!`, attachment);
	}
}