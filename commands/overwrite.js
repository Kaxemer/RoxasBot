module.exports = {
  name: 'overwrite',
  description: 'Changes channel perms',
  execute(message, args) {
    var chans = message.guild.channels;
    chans.forEach(function(value, key, map) {
      value.overwritePermissions('535281988320362520', {
        VIEW_CHANNEL: false
      })
      .catch(console.error);
    });
  },
};
