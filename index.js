const Discord = require('discord.js');
const SteamTotp = require('steam-totp');
const fs = require('fs');
const client = new Discord.Client();

// Read the config file and parse it as JSON
const config = JSON.parse(fs.readFileSync('config.json'));

client.on('message', message => {
    // Only respond to the "!2fa" command if it was sent in the channel specified in the config
    if (message.content === '!2fa' && message.channel.name === config.channelName) {
        // Generate the 2FA code using the steam-totp library and the secret from the config file
        const code = SteamTotp.generateAuthCode(config.secret);
        message.channel.send(`Your 2FA code is: ${code}`);
    }
});

// Use the bot token from the config file to log in
client.login(config.botToken);
