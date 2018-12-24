module.exports = {
  name: 'timeout',
  description: 'You\'ve managed to annoy me.',
  guildOnly: true,
  execute(message, args) {
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You can\'t do that');

    if(!message.mentions.users.size) return message.reply('I need a name');

    const userList = message.mentions.members.map(member => {
      return member.setRoles(['463751951801384960']);
    });

    message.reply('I got em.')


  },
};
