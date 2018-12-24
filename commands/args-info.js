module.exports = {
  name: 'args-info',
  description: 'Gives arguments.',
  args: true,
  execute(message, args) {
    if (args[0] === 'foo') {
      return message.channel.send('bar');
    }
    message.channel.send(`Arguments: ${args}`);
  },
};
