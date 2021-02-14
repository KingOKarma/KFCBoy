import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { User } from "../../entity/user";
import { getConnection } from "typeorm";

// Creates a new class (being the command) extending off of the commando client
export default class FindMeCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            description: "add me test",
            // This is the group the command is put in
            group: "dev",
            // This is the name of set within the group (most people keep this the same)
            memberName: "findme",
            name: "findme",
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
        message: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        const userRepo = getConnection().getRepository(User);
        const user = await userRepo.findOne(message.author.id);

        console.log(user);

        return message.channel.send("done no errors found");
    }
}
