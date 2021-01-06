module.exports = {
  name: "raw",
  run: async (bot, raw) => {
    if(raw.t == "INTERACTION_CREATE") {
      var data = raw.d;

      bot.api.interactions(raw.d.id, raw.d.token).callback.post({data: {
        type: 4,
        data: {
          content: raw.d.data.options[0].value
          }
        }
      })
    } else {
      return
    }
  }
}
