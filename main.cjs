// Required discord classes
const fs = require('node:fs');
const pathModule = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Creating bot instance
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Creating bot commands
bot.commands = new Collection();

const foldersPath = pathModule.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = pathModule.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = pathModule.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      // Set a new item in the Collection with the key as the command name
      // and the value as the exported module
      bot.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

// When bot ready, let me know
bot.once(Events.ClientReady, readyClient => {
  console.log(`Bot ${readyClient.user.tag} is running...`);
});

// Interaction
bot.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = bot.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

// Use Bot Token to login and run (keep at end)
bot.login(token);

// Export the bot instance and commands collection
module.exports = { bot, commands: bot.commands };