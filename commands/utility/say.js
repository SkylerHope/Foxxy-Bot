// say.js

const { SlashCommandBuilder, User } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make Foxxy say anything'),
    execute: async (interaction) => {
        let text = User.arguments;
        await interaction.reply(text);
    }
}