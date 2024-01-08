// say.js

const { SlashCommandBuilder, User } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make Foxxy say anything')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Type your text here')
                .setRequired(true)
    ),
    execute: async (interaction) => {
        const userText = interaction.options.getString('text');
        await interaction.reply(userText);
    },
};