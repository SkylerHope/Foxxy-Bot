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
        const userName = user.username;
        const userAvatar = user.avatarURL({ format: 'png', dynamic: true, size: 256 });

        if (!user) {
            user = author;
        }

        const userInfoEmbed = new EmbedBuilder()
            .setTitle(`${userName}'s Info`)
            .setAuthor({ name: `${author}`, iconURL: `${userAvatar}`})

        // Below line for testing
        await interaction.reply(userInfoEmbed); 
    }
};