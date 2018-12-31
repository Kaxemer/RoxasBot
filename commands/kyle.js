const db = require('../index.js');
const pool = db.pool;

module.exports = {
  name: 'kyle',
  description: 'Counts the number of times I want to ban Kyle',
  cooldown: 30,
  execute(message, args) {
    const upd = ('UPDATE kyle SET count = count + 1 WHERE key = 0');
    const query = ('SELECT count FROM kyle WHERE key = 0');
    pool.query(upd, function(err, result){
      if (err) throw err;
      pool.query(query, function(err, result) {
        if (err) throw err;
        console.log(result.rows[0].count);
        message.channel.send(`The amount of times Kyle should be banned: ${result.rows[0].count}`);
      });
    });
  },
};
