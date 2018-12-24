module.exports = {
  name: 'avatar',
  description: 'Gives avatar URL.',
  aliases: ['icon', 'pfp'],
  execute(message, args) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`)
    }
    const taggedUser = message.mentions.users.first();
    message.channel.send(`${taggedUser.username}'s Avatar: ${taggedUser.displayAvatarURL}`)
  },
};
