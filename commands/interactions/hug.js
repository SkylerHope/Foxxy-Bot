// hug.js

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug a user')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Mention a user')
                .setRequired(true)
    ),
    execute: async (interaction) => {
        const author = interaction.user;
        const authorName = author.username;
        let user = interaction.options.getUser('user');
        const userName = user.username;
    }
}