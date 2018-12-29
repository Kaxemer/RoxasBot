module.exports = {
  name: 'addrole',
  description: 'Adds user to role',
  usage: '[member][roles]',
  execute(message, args) {
    if (!args.length) return message.reply('I need a role');

    if (!message.member.hasPermissions('MANAGE_ROLES')) return message.reply("You can't do that");

    if(!message.mentions.users.size) return message.reply('I need a name');

    const taggedUser = message.mentions.members.first();

    const comp = args.shift();

    return message.reply(comp === taggedUser);

    args.forEach(function(entry) {
      try {
        var role = message.guild.roles.find(role => role.name === entry);
      } catch (e) {
        message.reply("You've entered an invalid role");
      }
      taggedUser.addRole(entry);
    });
  },
};
