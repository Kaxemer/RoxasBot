const db = require('../index.js');
const pool = db.pool;

module.exports = {
  name: 'displaystore',
  description: 'Displays items in the store.',
  aliases: ['viewstore'],
  execute(message, args) {
    var mess = ``;
    pool.query('SELECT *  FROM store', function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.rows.length; i++) {
        mess = (`${mess}${result.rows[i].item}=>${result.rows[i].cost}💰\n`);
      }
      console.log(mess);
      message.channel.send(mess);
    });
  },
};
