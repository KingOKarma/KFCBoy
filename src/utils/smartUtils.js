'use strict';


// quick note these arent smart at all but i didnt know what to call them so yeah smart utils it was


function logErr(message, err) {
    if(message == null) {
        console.log(err);
        console.log("no error message was sent to the user")
    } else {
        message.channel.send("sorry but an error apeared. please try the same action again in a bit");
        console.log(err);
    }
}

exports.logErr = logErr;