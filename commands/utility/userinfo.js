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
        const author = interaction.user;
        const user = interaction.options.getUser('user');
        const userName = user.username;
        const authorAvatar = author.avatarURL({ format: 'png', dynamic: true, size: 256 });
        const userAvatar = user.avatarURL({ format: 'png', dynamic: true, size: 512});

        if (!user) {
            user = author;
        }

        const userId = guild.members.cache.get(user.id);
        const userJoinedAt = userId.JoinedAt;

        const userInfoEmbed = new EmbedBuilder()
            .setTitle(`${userName}'s Info`)
            .setAuthor({ name: `${author}`, iconURL: `${authorAvatar}`})
            .setThumbnail(`${userAvatar}`)
            .addFields(
                { name: 'Name', value: `${userName}`, inline: false },
                { name: 'Joined Server At', value: `${userJoinedAt}`, inline: false }
            )

        // Below line for testing
        await interaction.reply({ embeds: [userInfoEmbed]}); 
    },
};