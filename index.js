require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports.pool = pool;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();


client.once('ready', () => {
  console.log('Ready!');
});

client.on('guildMemberAdd', member => {
    member.addRole('535281988320362520');
    try {
        if(pool.query(`SELECT EXISTS (select ${member.id} where name = ${member.id}`)){
            pool.query(`INSERT INTO inventory (name, items) VALUES (${member.id}, '{"Nothing"}')`);
        }
    }
    catch (error) {
        console.log(error);
    }
});

client.on('message', message => {

  // if (message.content === 'F' || message.content ==='f' && !message.author.bot) return message.channel.send('F');

  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

  const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
  || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.channel.reply('I can\'t execute that comand in the DMs.')
  }
  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}`);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.reply('Something went wrong')
  }

});



client.login();
