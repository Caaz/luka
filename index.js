const {Client, GatewayIntentBits} = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// Read the config file and parse it as JSON
const config = JSON.parse(fs.readFileSync('config.json'));

// get the list of files in the folder
const files = fs.readdirSync('./plugins/');

// loop through the files and require each one
for (const file of files) {
    // only require files with a .js extension
    if (file.endsWith('.js')) {
        console.log(`Importing plugin ${file}`)
        const module = require(`./plugins/${file}`);

        // call the module with the required arguments
        module(client, config);
    }
}
// Use the bot token from the config file to log in
client.login(config.botToken);
