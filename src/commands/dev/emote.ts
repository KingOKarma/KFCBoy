import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { getEmote } from "../../utils";

// Creates a new class (being the command) extending off of the commando client
export default class AddMeCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            args: [
                {
                    error: "Only send an emote!",
                    key: "emoteID",
                    prompt: "Which emote do you wish to enlarge??",
                    type: "string"
                }
            ],
            description: "Shows an emote as an image",
            // This is the group the command is put in
            group: "dev",
            // This is the name of set within the group (most people keep this the same)
            memberName: "emote",
            name: "emote",
            ownerOnly: true,

            // Ratelimits the command usage to 3 every 5 seconds
            throttling: {
                duration: 5,
                usages: 3
            }
            // Makes command only usable by owners (set in index.js)
        });
    }

    // Now to run the actual command, the run() parameters need to be defiend (by types and names)
    public async run(
        msg: commando.CommandoMessage,
        { emoteID }: {emoteID: string; }
    ): Promise<Message | Message[]> {
        const emote = getEmote(emoteID, this.client);

        if (emote === undefined) {
            return msg.say("Please only send an emote from a server that i'm in");
        }
        let ending = "png";

        if (emote.animated) {
            ending = "gif";
        }
        return msg.say(`https://cdn.discordapp.com/emojis/${emote.id}.${ending}?size4096`);

    }
}
