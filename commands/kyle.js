const db = require(../index.js);
const pool = db.pool;

module.exports = {
  name: 'kyle',
  description: 'Counts the number of times I want to ban Kyle',
  execute(message, args) {
    const upd = ('UPDATE kyle SET count = count + 1 WHERE key = 0');
    const query = ('SELECT count FROM kyle WHERE key = 0');
    pool.query(upd, function(err, result){
      if (err) throw err;
      message.channel.send("Value updated!");
    });
    pool.query(query, function(err, result) {
      if (err) throw err;
      var val = results[0].count;
    });
    message.channel.send(`Times Kyle Should Be Banned: ${val}`).catch(console.error);
  },
};
