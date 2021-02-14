import * as commando from "discord.js-commando";
import { Message } from "discord.js";
// Creates a new class (being the command) extending off of the commando client
export default class SayCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            // Creates aliases
            aliases: ["s", "sentence"],
            // These are your arguments
            args: [
                {
                    key: "args1",
                    prompt: "Give me something good to say!",
                    type: "string"
                }
            ],
            // Checks if bot has delete message perms
            clientPermissions: ["MANAGE_MESSAGES"],
            description: "I can say whatever the user wants!",
            // This is the group the command is put in
            group: "other",
            // Makes commands only avalabie within the guild
            guildOnly: true,
            // This is the name of set within the group (most people keep this the same)
            memberName: "say",
            name: "say",
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
        { args1 }: { args1: string; }
    ): Promise<Message | Message[]> {
    // Deletes command usage
        void msg.delete();
        // Responds with whatever the user has said.
        return msg.say(args1);
    }
}
