// pat.js

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { patGifs } = require('../../gifs.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Pat a user')
        .addMentionableOption(option =>
            option.setName('user')
                .setDescription('Mention a user')
                .setRequired(true)
    ),
    execute: async (interaction) => {
        const author = interaction.user;
        const authorName = author.username;
        let user = interaction.options.getUser('user');
        let gif = patGifs[Math.floor(Math.random() * patGifs.length)];

        const patEmbed = new EmbedBuilder()
            .setDescription(`${authorName} pats <@${user.id}>`)
            .setThumbnail(gif)
        await interaction.reply({ embeds: [patEmbed] });
    },
};