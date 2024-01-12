// slap.js

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { slapGifs } = require('../../gifs.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap a user')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Mention a user')
                .setRequired(true)
    ),
    execute: async (interaction) => {
        const author = interaction.user;
        const authorName = author.username;
        let user = interaction.options.getUser('user')
        let gif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

        const slapEmbed = new EmbedBuilder()
            .setDescription(`${authorName} slaps <@${user.id}>`)
            .setThumbnail(gif)
        await interaction.reply({ embeds: [slapEmbed] });
    },
};