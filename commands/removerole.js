module.exports = {
  name: 'removerole',
  description: 'Removes user from roles',
  usage: '[member][roles]',
  execute(message, args) {
    if (!args.length) return message.reply('I need a role');

    if (!message.member.hasPermissions('MANAGE_ROLES')) return message.reply("You can't do that");

    if(!message.mentions.users.size) return message.reply('I need a name');

    const taggedUser = message.mentions.members.first();

    const comp = args.shift();

    if (comp != taggedUser) return message.reply('Incorrect usage!');

    var role;

    args.forEach(function(entry) {
        let role = message.guild.roles.find(r => r.name === entry)
        taggedUser.removeRole(role).catch(console.error);
    });
    message.reply('Roles successfully removed.')
  },
};
