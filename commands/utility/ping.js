// ping.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping') // Set the name explicitly
    .setDescription('Ping test command'),
  execute: async (interaction) => {
    await interaction.reply('Pong!');
  },
};