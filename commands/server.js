module.exports = {
  name: 'server',
  description: 'Gives server stats',
  execute(message, args) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  },
};
