// userinfo.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get info of mentioned user')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Mention a user')
                .setRequired(false)
    ),
    execute: async (interaction) => {
        const mentionedUser = interaction.options.getName('user');
        // Below line for testing
        await interaction.reply(mentionedUser); 
    }
};