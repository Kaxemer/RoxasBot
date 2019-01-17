module.exports = {
  name: "poll",
  description: "Uses reactions to poll",
  cooldown: 10,
  execute(message, args) {
    message.channel.send("Is Aqua waifu?")
    .then(msg => {
      msg.react("👍")
      .then(() => msg.react("👎"))
      .catch(() => message.channel.send("Reaction failed"));
    });
  },
};
