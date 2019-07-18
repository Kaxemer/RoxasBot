const db = require('../index.js');
const pool = db.pool;

module.exports = {
    name: 'initinv',
    description: 'Gives everyone a place in the inv DB.',
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('Not possible!');
        var mems = message.guild.members;
        var query = ``;
        mems.forEach(function(value, key, map) {
            if (pool.query(`SELECT EXISTS (select ${key} where name = ${key})`))  {
                query = `INSERT INTO inventory (name) VALUES (${key})`;
                pool.query(query, function(err, results) {
                    if (err){
                        console.log(err);
                        throw err;
                    }
                    console.log("Success");
                    message.channel.send('Everyone added');
                });
            };
        });
    },
};
