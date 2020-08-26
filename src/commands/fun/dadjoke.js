const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 

module.exports = {
    name: 'dadjoke',
    aliases: ["dad"],
    run: (_, message, args, bot) => {
        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });


        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Fun"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    dadjokes = ["The recipe said, “Set the oven to 180 degrees \n ||Now i can't open it, as the door faces the wall.||",
                        "Want to know where I store all of my jokes? \n ||In a dadabase.||",
                        "Did you know SCUBA is an acronym for Self Contained Underwater Breathing Apparatus? Did you know “tuba” is also an acronym? \n ||Terrible Underwater Breathing Apparatus.||",
                        "Today, my son asked \"Can I have a book mark?\" and I burst into tears.||11 years old and he still doesn't know my name is Brian.||",
                        "My wife is really mad at the fact that I have no sense of direction. ||So I packed up my stuff and right.||",
                        "DAD: I was just listening to the radio on my way in to town, apparently an actress just killed herself. \n\nMOM: Oh my! Who!? \n\nDAD: Uh, I can't remember... I think her name was Reese something? \n\nMOM: WITHERSPOON!!!!!??????? \n\nDAD: No, it was with a knife...",
                        "How do you make holy water? ||You boil the hell out of it.||",
                        "I bought some shoes from a drug dealer.|| I don't know what he laced them with, but I was tripping all day!||",
                        "Did you know the first French fries weren't actually cooked in France? ||They were cooked in Greece.||",
                        "If a child refuses to sleep during nap time, ||are they guilty of resisting a rest?||",
                        "The secret service isn't allowed to yell \"Get down!\" anymore when the president is about to be attacked. ||Now they have to yell \"Donald, duck!\"||",
                        "I'm reading a book about anti-gravity. ||It's impossible to put down!||",
                        "What do you call someone with no body and no nose? ||Nobody knows.||",
                        "I ordered a chicken and an egg from Amazon.|| I’ll let you know which came first||",
                        "What is the least spoken language in the world? ||Sign language||",
                        "My daughter screeched, \"Daaaaaad, you haven't listened to one word I've said, have you!?\" ||What a strange way to start a conversation with me...||",
                        "A slice of apple pie is $2.50 in Jamaica and $3.00 in the Bahamas. ||These are the pie rates of the Caribbean.||",
                        "My wife tried to unlatch our daughter's car seat with one hand and said, \"How do one armed mothers do it?\" Without missing a beat I replied, ||\"Single handedly.\"||",
                        "When a dad drives past a graveyard: Did you know that's a popular cemetery? Yep, ||people are just dying to get in there!||",
                        "My friend keeps saying \"cheer up man it could be worse, you could be stuck underground in a hole full of water.\" ||I know he means well.||",
                        "Justice is a dish best served cold, ||if it were served warm it would be justwater.||",
                        "The fattest knight at King Arthur’s round table was Sir Cumference. ||He acquired his size from too much pi.||",
                        "MOM: \"How do I look?\" DAD: ||\"With your eyes.\"||",
                        "Why can't you hear a pterodactyl go to the bathroom? ||Because the pee is silent.||",
                        "What does a zombie vegetarian eat? ||“GRRRAAAAAIIIINNNNS!”||",
                        "Spring is here! I got so excited ||I wet my plants!||",
                        "3 unwritten rules of life... \n1||              .|| \n2||          .|| \n3||                                      .||",
                        "If you see a robbery at an Apple Store does that make you an ||iWitness?||",
                        "Did you hear the news? FedEx and UPS are merging. They’re going to go by the name|| Fed-Up ||from now on.",
                        "Don't trust atoms. ||They make up everything!||",
                        "I told my son I was named after Thomas Jefferson… He said, “But dad, your name is Brian.” I said, ||“I know, but I was named AFTER Thomas Jefferson.”||",
                        "KID: \"Dad, make me a sandwich!\" DAD: ||\"Poof, you’re a sandwich!”||",
                        "Why did the invisible man turn down the job offer? ||He couldn't see himself doing it.||",
                        "SERVER: \"Sorry about your wait.\" DAD: ||\"Are you saying I’m fat?”||",
                        "What has two butts and kills people? ||An assassin||",
                        "What did the pirate say on his 80th birthday? ||AYE MATEY||",
                        "CASHIER: \"Would you like the milk in a bag, sir?\" DAD: ||\"No, just leave it in the carton!”||"]
                    let random = dadjokes[Math.floor(Math.random() * dadjokes.length)];

                    message.channel.send(random);

                }
                if (toggle) return message.channel.send("This server has the \"Fun\" module disabled")

            })


    }
}