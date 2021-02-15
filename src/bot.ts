import "reflect-metadata";
import { onMessage, onReady } from "./events";
import { CONFIG } from "./globals";
import { Client } from "discord.js-commando";
import { createConnection } from "typeorm";
import path from "path";

async function main(): Promise<void> {
    await createConnection();
    const bot = new Client({
        // My choses prefix is "c." you can choose anything you want!
        commandPrefix: CONFIG.prefix,
        owner: CONFIG.owners

    });

    // Runs the function defined in ./events
    bot.on("ready", () => void onReady(bot));

    bot.on("message", async (message) => onMessage(message));
    // Registers all groups/commands/etc
    bot.registry.registerGroups([
        ["economy", "Earning money from KFC? nice!"],
        ["xp", "It's not a super hero game but you can earn xp anyway!"],
        ["staff", "Commands only Staff of a server can run."],
        ["other", "Commands which are still a work in progress."],
        ["dev", "These commands can only be executed by the bot owners"]
    ]).registerDefaults()

        .registerCommandsIn(
            path.join(__dirname, "commands")
        );

    await bot.login(CONFIG.token);

}

main().catch(console.error);
