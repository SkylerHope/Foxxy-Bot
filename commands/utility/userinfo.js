// userinfo.js

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

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
        const author = message.author;
        const user = interaction.options.getUser('user');
        if (!user) {
            user = author;
        }

        const userInfoEmbed = new EmbedBuilder()
            .setTitle('Info on ' + user.username)

        // Below line for testing
        await interaction.reply(userInfoEmbed); 
    }
};