import { Client, Message, MessageEmbed, Presence } from "discord.js";
import { CONFIG } from "./globals";
import { GlobalUser } from "./entity/globalUser";
import { Guild } from "./entity/guild";
import { User } from "./entity/user";
import { getRepository } from "typeorm";

const xpTimeout = new Map();

export async function onReady(bot: Client): Promise<Presence | void> {
    if (!bot.user) {
        return void console.log("There was a problem with logging in");
    }
    console.log(`${bot.user.tag} is online!`);
    return bot.user.setActivity("me cuz I got a new updated bros", { type: "WATCHING" });
}

// XP System
export async function onMessage(msg: Message): Promise<void | Message | Message[]> {
    if (msg.author.bot) return;
    if (msg.guild === null) return;
    if (msg.content.toLowerCase().startsWith(`${CONFIG.prefix}`)) return;

    const userRepo = getRepository(User);
    const gUserRepo = getRepository(GlobalUser);
    const guildRepo = getRepository(Guild);

    let guild = await guildRepo.findOne( { serverid: msg.guild.id });
    const user = await userRepo.findOne({ serverId: msg.guild.id, uid: msg.author.id });
    const gUser = await gUserRepo.findOne( { uid: msg.author.id } );
    const timeout = xpTimeout.get(msg.author.id);
    let xpGain = Math.ceil(msg.content.length * 2);

    // If above 10, set 10
    if (xpGain > 11) {
        xpGain = Math.ceil(+10);
    }

    // If there is no Guild then add to  DB
    if (!guild) {
        const newGuild = new Guild();
        newGuild.serverid = msg.guild.id;
        newGuild.name = msg.guild.name;
        void guildRepo.save(newGuild);
        guild = newGuild;
    }

    // If server boosted then x2 and let premium user get 3x
    let multiplier = 2;
    if (guild.boosted) {
        xpGain *= multiplier;
        multiplier += 1;
    }

    // If there is no GlobalUser then add to  DB
    if (!gUser) {
        const newGUser = new GlobalUser();
        newGUser.avatar = msg.author.displayAvatarURL({ dynamic: true });
        newGUser.uid = msg.author.id;
        newGUser.tag = msg.author.tag;
        void gUserRepo.save(newGUser);
    } else {

        // Check if user is a premium user, if true x2 xp
        if (gUser.premium) xpGain *= multiplier;

        // Check Timeout
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!timeout) {

            // If Member doesn't exist add to DB
            if (!user) {
                const newUser = new User();
                newUser.uid = msg.author.id;
                newUser.serverId = msg.guild.id;
                newUser.avatar = msg.author.displayAvatarURL({ dynamic: true });
                newUser.tag = msg.author.tag;
                newUser.xp = xpGain;
                void userRepo.save(newUser);

                // Level up member
            } else if (user.xp + xpGain >= Math.round((user.level + 1) * 1000)) {
                const gain = Math.round((user.level + 1) * 1000) - (user.xp + xpGain);
                user.uid = msg.author.id;
                user.serverId = msg.guild.id;
                user.avatar = msg.author.displayAvatarURL({ dynamic: true });
                user.tag = msg.author.tag;
                user.xp = gain;
                user.level += 1;

                void userRepo.save(user);

                const embed = new MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`Congrats you level up to ${user.level}!`)
                    .setTimestamp();
                return msg.channel.send(embed);

                // Default Add XP
            } else {
                user.uid = msg.author.id;
                user.serverId = msg.guild.id;
                user.avatar = msg.author.displayAvatarURL({ dynamic: true });
                user.tag = msg.author.tag;
                user.xp += xpGain;

                xpTimeout.set(msg.author.id, "1");
                setTimeout(() => {
                    xpTimeout.delete(msg.author.id);
                }, 5 * 2000);
                void userRepo.save(user);
            }
        }
    }
}
