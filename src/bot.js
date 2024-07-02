require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const {Guilds, GuildMembers, GuildMessages,GuildVoiceStates,MessageContent, GuildModeration} = GatewayIntentBits;
const {User,Message,GuildMember,ThreadMember }=Partials;

const fs = require("fs");


const client = new Client({ intents: [Guilds,GuildMembers,GuildMessages, MessageContent,GuildVoiceStates, GuildModeration],partials: [User,Message,GuildMember,ThreadMember] });
client.commands = new Collection();
client.modals = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.guildConfig = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
