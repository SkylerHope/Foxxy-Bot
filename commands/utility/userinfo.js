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
        const authorName = author.username;
        const user = interaction.options.getUser('user');
        const userName = user.username;
        const guild = interaction.guild;
        const authorAvatar = author.avatarURL({ format: 'png', dynamic: true, size: 256 });
        const userAvatar = user.avatarURL({ format: 'png', dynamic: true, size: 512});

        if (!user) {
            user = author;
        }

        const userMember = guild.members.cache.get(user.id);
        const userJoinedAt = userMember.JoinedAt;

        const userInfoEmbed = new EmbedBuilder()
            .setTitle(`${userName}'s Info`)
            .setAuthor({ name: `${authorName}`, iconURL: `${authorAvatar}`})
            .setThumbnail(`${userAvatar}`)
            .addFields(
                { name: 'Name', value: `${userName}`, inline: false },
                { name: 'Joined Server At', value: `${userJoinedAt}`, inline: false }
            )

        // Below line for testing
        await interaction.reply({ embeds: [userInfoEmbed]});
    },
};