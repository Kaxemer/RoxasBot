const db = require('../index.js');
const pool = db.pool;

module.exports = {
  name: 'additem',
  description: 'Adds item to the shop',
  usage: '<cost><item>',
  execute(message, args) {

    if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You can\'t do that!');
    if(!args.length) return message.reply('Yeah. I need something to work with')
    const cost = args.shift();
    if(!args.length) return message.reply('Yeah. I need an item.');
    const item = args.join(' ');
    if (isNaN(cost)) return message.reply('The cost is not a number.');

    const query = `INSERT INTO store (item, cost) VALUES ('${item}', ${cost})`;

    pool.query(query, function(err, result) {
      if (err) throw err;
      console.log('Item Added!');
      message.channel.send('Item succesfully added to the shop.');
    });
  },
};
