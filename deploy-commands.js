const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const { commands } = require('./main.cjs');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    const commandArray = commands.map(({ data }) => data.toJSON());

    // Deploy global commands
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commandArray },
    );

    console.log(`Successfully deployed ${data.length} global command(s).`);
  } catch (error) {
    console.error(error);
  }
})();