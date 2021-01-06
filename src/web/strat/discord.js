const passport = require("passport");
const discordstart = require("passport-discord");
const User = require("../../models/dashboardUser");
const config = require("../../config.json")

passport.serializeUser((user, done) => {
    done(null, user.discordID)
});

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = await User.findOne({discordID: discordId});
        return user ? done(null, user): done(null, null);

    } catch (err) {
        done(err, null)
    }
})


passport.use(
    new discordstart( {
        clientID:config.ClientID,
        clientSecret:config.ClientSecret,
        callbackURL:config.CallbackURL,
        scope: ["identify", "guilds"]
    }, async (accessToken, refreshToken, profile, done) => {


        try {
            const {id, username, discriminator, avatar, guilds} = profile;
            const finduser = await User.findOneAndUpdate({ discordID: id}, {
                discordTag:`${username}#${discriminator}`,
                avatar,
                guilds, 
            }, {new: true});
    
            if(finduser) {
                console.log("user found")
                return done(null, finduser)
            } else {
                const newUser = await User.create({
                    discordID: id,
                    discordTag:`${username}#${discriminator}`,
                    avatar,
                    guilds, 
                })
                return done(null, newUser)
            }
        } catch (err) {
            console.log(err)
            return done(err, null)
        }

    })
);
