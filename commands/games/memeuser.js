// memeuser.js

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('memeuser')
        .setDescription('Meme a user')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Mention a user')
                .setRequired(true)
    ),
    execute: async (interaction) => {
        const author = interaction.user;
        let authorAvatar = author.avatarURL({ format: 'png', dynamic: true, size: 512 });
        let user = interaction.options.getUser('user');
        const userName = user.username;
        const userMention = user.mention;
        let userAvatar = user
            ? user.avatarURL({ format: 'png', dynamic: true, size: 512 }) || author.avatarURL({ format: 'png', dynamic: true, size: 512 })
            : author.avatarURL({ format: 'png', dynamic: true, size: 512 });

        if(userAvatar == authorAvatar && user != author) {
                userAvatar = "https://static.wikia.nocookie.net/among-us-wiki/images/5/54/Seeker.png";
        }

        const memeUserEmbed = new EmbedBuilder()
            .setTitle(`${userName}`)
            .setDescription(`You done did it now <@${user.id}>!`)
            .setThumbnail(userAvatar)
            .setImage("https://i.ibb.co/724F7wZ/laughatthisuser.gif");
        await interaction.reply({ embeds: [memeUserEmbed] });
    },
};