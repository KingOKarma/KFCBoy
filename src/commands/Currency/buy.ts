import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../globals";
import { Inventory } from "../../entity/inventory";
import { ItemMeta } from "../../entity/item";
import { User } from "../../entity/user";
import { getRepository } from "typeorm";

// Creates a new class (being the command) extending off of the commando client
export default class BuyCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            args: [
                {
                    default: "",
                    error: "Make sure to use a members ID or mention!",
                    key: "itemName",
                    prompt: "Which member's currency are you looking for?",
                    type: "string"
                }
            ],
            clientPermissions: ["EMBED_LINKS"],
            description: "Check the balance of a user",
            // This is the group the command is put in
            group: "currency",
            guildOnly: true,
            // This is the name of set within the group (most people keep this the same)
            memberName: "buy",
            name: "buy",
            // Ratelimits the command usage to 3 every 5 seconds
            throttling: {
                duration: 5,
                usages: 3
            }
        });
    }

    // Now to run the actual command, the run() parameters need to be defiend (by types and names)
    public async run(
        msg: commando.CommandoMessage,
        { itemName }: {itemName: string; }
    ): Promise<Message | Message[]> {
        const userRepo = getRepository(User);
        const itemsRepo = getRepository(ItemMeta);
        const invRepo = getRepository(Inventory);

        let user = await userRepo.findOne({ uid: msg.author.id } );
        const item = await itemsRepo.findOne({ name: itemName });
        const inv = await invRepo.findOne({ serverid: msg.guild.id, uid: msg.author.id });

        if (!item) {
            return msg.say("That item does not exist in the shop, try again with the exact name!");
        }

        if (!user) {
            const newUser = new User();
            newUser.uid = msg.author.id;
            newUser.serverId = msg.guild.id;
            newUser.avatar = msg.author.displayAvatarURL({ dynamic: true });
            newUser.tag = msg.author.tag;
            newUser.nuggies = 1;
            void userRepo.save(newUser);
            user = newUser;
        }

        if (user.nuggies < item.price) {
            return msg.say(`You don't have enough nuggies for ${item.name}!`);
        }

        if (!inv) {
            const newInv = new Inventory();
            newInv.serverid = msg.guild.id;
            newInv.uid = msg.author.id;
            newInv.user = user;
            newInv.items = [item];
            void invRepo.save(newInv);

        } else {
            inv.items.push(item);
            void invRepo.save(inv);
        }


        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Currency")
            .setAuthor(user.tag, user.avatar)
            .setDescription(`You just bought **${itemName}**, it's now in your inventory!`)
            .setFooter(`You can use ${CONFIG.prefix}inv to check what items you have`)
            .setTimestamp();
        return msg.channel.send(embed);

    }
}
