const Discord = require('discord.js')

module.exports = {
  name: 'info',
  description: 'An example of an embed',
  execute(message, args) {
    const exampleEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(message.author.username)
    .setDescription('My information')
    .setThumbnail(message.author.displayAvatarURL)
    .addBlankField()
    .addField('Date created', message.author.createdAt , true)
    .addField('Date joined', message.member.joinedAt, true)
    .addField('Highest Role', message.member.highestRole, true)
    .setTimestamp()


    message.channel.send(exampleEmbed);
  },
};
