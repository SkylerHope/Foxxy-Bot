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
        let user = interaction.options.getUser('user');
        const userName = user ? user.username : authorName;
        const guild = interaction.guild;
        let authorAvatar = author.avatarURL({ format: 'png', dynamic: true, size: 256 });
        let userAvatar = user
            ? user.avatarURL({ format: 'png', dynamic: true, size: 512 }) || author.avatarURL({ format: 'png', dynamic: true, size: 256 })
            : author.avatarURL({ format: 'png', dynamic: true, size: 256 });

        if (!user) {
            user = author;
        }

        if(userAvatar == authorAvatar && user != author) {
            userAvatar = "https://media.tenor.com/jckQWDcU0NEAAAAi/discord-loading-icon.gif";
        }

        if(!authorAvatar) {
            authorAvatar = "https://media.tenor.com/jckQWDcU0NEAAAAi/discord-loading-icon.gif";
        }

        let userMember = guild.members.cache.get(user.id);
        const userJoinDate = userMember.joinedAt ? userMember.joinedAt.toDateString() : 'Not available';
        const roles = userMember ? userMember.roles.cache.map(role => role.name) : [];
        const messageCount = userMember ? await interaction.channel.messages.fetch({ limit: 100 }).then(messages => messages.filter(msg => msg.author.id === user.id).size) : 0;

        const userInfoEmbed = new EmbedBuilder()
            .setTitle(`${userName}'s Info`)
            .setAuthor({ name: `${authorName}`, iconURL: `${authorAvatar}`})
            .setThumbnail(userAvatar)
            .addFields(
                { name: 'Name', value: `${userName}`, inline: true },
                { name: 'Joined Server At', value: `${userJoinDate}`, inline: true },
                { name: 'Roles', value: roles.length > 0 ? roles.join(', ') : 'No roles', inline: false },
                { name: 'Messages', value: `${messageCount}`, inline: true }
            )
        await interaction.reply({ embeds: [userInfoEmbed]});
    },
};