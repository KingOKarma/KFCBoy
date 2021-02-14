import * as commando from "discord.js-commando";
import { Guild } from "../../entity/guild";
import { ItemMeta } from "../../entity/item";
import { Message } from "discord.js";
import { getRepository } from "typeorm";

export default class NewShopItemCommand extends commando.Command {
    public constructor(client: commando.Client) {
        super(client, {
            aliases: ["newitem", "newshop", "additem"],
            args: [
                {
                    error: "Try not to use special characters (max length 20 characters)",
                    key: "itemName",
                    prompt: "The name of the new item",
                    type: "string",
                    validate: (text: string): boolean => text.length < 21
                },
                {
                    error: "Please only use a number for the stock count",
                    key: "price",
                    prompt: "How much does the item cost?",
                    type: "integer"
                },
                {
                    error: "Please only use a number for the price",
                    key: "max",
                    prompt: "How of these items are in stock?",
                    type: "integer"
                },
                {
                    error: "Try not to use special characters (max length 100 characters)",
                    key: "itemDesc",
                    prompt: "What is the description of the item (max length 100 characters)",
                    type: "string",
                    validate: (text: string): boolean => text.length < 101
                }
            ],
            description: "Add Items to your server shop",
            group: "currency",
            memberName: "itemadd",
            name: "itemadd",
            throttling: {
                duration: 5,
                usages: 3
            },
            userPermissions: ["MANAGE_GUILD"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { itemName, price, max, itemDesc }: {
            itemDesc: string;
            itemName: string;
            max: number;
            price: number;
        }
    ): Promise<Message | Message[]> {
        const itemsDB = getRepository(ItemMeta);
        const guildDB = getRepository(Guild);
        let guild = await guildDB.findOne({ serverid: msg.guild.id });
        const items = await itemsDB.findOne({ guild, name: itemName });
        const newItem = new ItemMeta();


        if (!guild) {
            const newGuild = new Guild();
            newGuild.serverid = msg.guild.id;
            newGuild.name = msg.guild.name;
            newGuild.shop = [newItem];
            void guildDB.save(newGuild);
            guild = newGuild;
        }

        if (!items) {
            newItem.name = itemName;
            newItem.guild = guild;
            newItem.description = itemDesc;
            newItem.max = max;
            newItem.price = price;
            void itemsDB.save(newItem);
        } else {
            return msg.say("That item's name already exists please use a different name");
        }
        return msg.say(`Added the item **${itemName}**, Info:\n \`\`\`${itemDesc}\nPrice: ${price} Nuggies\nMax: ${max}\`\`\``);
    }
}
