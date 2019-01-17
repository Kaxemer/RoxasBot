module.exports = {
  name: 'overwrite',
  description: 'Changes channel perms',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('Not possible.');
    var chans = message.guild.channels;
    chans.forEach(function(value, key, map) {
      value.overwritePermissions('535281988320362520', {
        VIEW_CHANNEL: false
      })
      .catch(console.error);
    });
  },
};
