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
        invite: "https://discord.gg/KPKprPgJWs",
        owner: CONFIG.owners

    });


    // Runs the function defined in ./events
    bot.on("ready", () => void onReady(bot));

    bot.on("message", async (message) => onMessage(message));
    // Registers all groups/commands/etc
    bot.registry.registerGroups([
        ["dev", "Dev - These commands can only be executed by the bot owners"],
        ["economy", "Economy - Earning money from KFC? nice!"],
        ["fun", "Fun - Never thought I'd have fun with a bot before"],
        ["image", "Image - Utialise my wonderful features for messing or searching images!"],
        ["info", "Info - Get some quick and easy access to some info!"],
        ["interactions", "Interactions - Interacting with the bot is fun and all but interacting with others is better!"],
        ["other", "Other - Commands which are still a work in progress."],
        ["staff", "Staff - Commands only Staff of a server can run."],
        ["xp", "XP - It's not a super hero game but you can earn xp anyway!"]
    ]).registerDefaults()

        .registerCommandsIn(
            path.join(__dirname, "commands")
        );

    await bot.login(CONFIG.token);

}

main().catch(console.error);
