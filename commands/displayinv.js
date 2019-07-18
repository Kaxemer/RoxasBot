const db = require('../index.js');
const pool = db.pool;

module.exports = {
  name: 'displayinv',
  description: 'Displays items in your inventory.',
  aliases: ['viewstuff', 'mystuff', 'myinv'],
  execute(message, args) {
    var mess = ``;
    pool.query(`SELECT * FROM inventory WHERE name=${message.member.id}`, function(err, result) {
      if (err) throw err;
      console.log(result.rows[0]);
      mess = (`${mess}Balance: ${result.rows[0].balance}\tItems: ${result.rows[0].items}\n`);
      message.channel.send(mess);
    });
  },
};
