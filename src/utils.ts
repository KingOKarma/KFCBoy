import { Emoji, Guild, GuildMember, Role } from "discord.js";
import { Client } from "discord.js-commando";
import { ItemMeta } from "./entity/item";
import { User } from "./entity/user";

/**
 * Used to check role mentions/ID's if they are roles
 * @param {Guild} guild the Guild instance the of where the Role is from
 * @param {string} rid The role mention/ID (Optional)
 * @returns {Role} A Role instance or undefined
 */
export function getRole(rid: string, guild: Guild): Role | undefined {
    let ridParsed = rid;
    // Check if a role was tagged or not. If the role was tagged remove the
    // Tag from rid.
    if (rid.startsWith("<@&") && rid.endsWith(">")) {
        const re = new RegExp("[<@&>]", "g");
        ridParsed = rid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return guild.roles.cache.get(ridParsed);
    } catch (e) {
        console.log(`Role not found because ${e}`);
        return undefined;
    }
}

/**
 * Used to check member mentions/ID's if they are roles
 * @param {string} uid The Member's ID
 * @param {Guild} guild the Guild instance the of where the Member is from
 * @returns {GuildMember} A Member instance from a server
 */
export function getMember(uid: string, guild: Guild): GuildMember | undefined {
    let uidParsed = uid;
    // Check if a member was tagged or not. If the member was tagged remove the
    // Tag from uid.
    if (uid.startsWith("<@") && uid.endsWith(">")) {
        const re = new RegExp("[<@!>]", "g");
        uidParsed = uid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return guild.members.cache.get(uidParsed);
    } catch (e) {
        console.log(`Member not found because ${e}`);
        return undefined;
    }
}
/**
 * Used to check if a user has at least one role from a list, returns true if found
 * @param {string} emoteString The raw emote string
 * @param {Client} client The client that is initialised
 * @returns {Emoji | undefined} Either returns the emote or undefiend
 */
export function getEmote(emoteString: string, client: Client): Emoji | undefined {
    if (!emoteString.match(/\:(.*?)\>/g)) {
        return undefined;
    }

    const findEmote = emoteString.slice(3).match(/\:.*?\>/g);
    if (findEmote === null) {
        return undefined;
    }

    const theMatch = findEmote[0].slice(1, -1);

    const emote = client.emojis.cache.get(theMatch);

    if (emote) {
        return emote;
    }

    return undefined;
}

/**
 * Used to check if a user has at least one role from a list, returns true if found
 * @param {Array} array The array to page
 * @param {number} pageSize How big are each of the pages?
 * @param {number} pageNumber Which Page number do you wish to be on?
 * @returns {Array} an array
 */
export function userpaginate(array: User[], pageSize: number, pageNumber: number): User[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

/**
 * Used to check if a user has at least one role from a list, returns true if found
 * @param {Array} array The array to page
 * @param {number} pageSize How big are each of the pages?
 * @param {number} pageNumber Which Page number do you wish to be on?
 * @returns {Array} an array
 */
export function shoppaginate(array: ItemMeta[], pageSize: number, pageNumber: number): ItemMeta[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

/**
 * Used to check if a user has at least one role from a list, returns true if found
 * @param {Array} array The array to page
 * @param {number} pageSize How big are each of the pages?
 * @param {number} pageNumber Which Page number do you wish to be on?
 * @returns {Array} an array
 */
export function stringpaginate(array: string[], pageSize: number, pageNumber: number): string[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

/**
 * Wait in miliseconds
 * @param {number} milliseconds The time in mlliseconds to wait
 */
export function sleep(milliseconds: number): void {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}