import { Guild } from 'discord.js';

// Added getRole function in here incase you don't like getMember (;
export function getRole(rid: string, guild: Guild) {
  let ridParsed = rid;
  // Check if a role was tagged or not. If the role was tagged remove the
  // tag from rid.
  if (rid.startsWith('<@&') && rid.endsWith('>')) {
    const re = new RegExp('[<@&>]', 'g');
    ridParsed = rid.replace(re, '');
  }
  // Try recovering the role and report if it was successful or not.
  try {
    return guild.roles.cache.get(ridParsed);
  } catch (e) {
    console.log(`Role not found because ${e}`);
    return undefined;
  }
}

export function getMember(uid: string, guild: Guild) {
  let uidParsed = uid;
  // Check if a member was tagged or not. If the member was tagged remove the
  // tag from uid.
  if (uid.startsWith('<@') && uid.endsWith('>')) {
    const re = new RegExp('[<@!>]', 'g');
    uidParsed = uid.replace(re, '');
  }
  // Try recovering the role and report if it was successful or not.
  try {
    return guild.members.cache.get(uidParsed);
  } catch (e) {
    console.log(`Member not found because ${e}`);
    return undefined;
  }
}
