import { Command } from "../command";
import { Pokemon } from "../../data-types/pokemon";
import { RichEmbed } from "discord.js";

export class InfoCommand extends Command {
    private pokemon: Pokemon;

    constructor(pokemonName: string) {
        super();
        this.pokemon = new Pokemon(pokemonName);
    }

    public get buildRichEmbed(): RichEmbed | string {
        if (this.pokemon) {
            let title = `#${this.pokemon.dexNum} ${this.pokemon.name}`
            let description = 'Type: ' + this.pokemon.type1;
            let imgName = (this.pokemon.name + (this.pokemon.form ? '-' + this.pokemon.form : '')).toLowerCase();

            if (this.pokemon.alias) {
                title += ` (${this.pokemon.alias})`;
            }
            if (this.pokemon.type2) {
                description += `, ${this.pokemon.type2}`;
            }
            description += `\nCounter Types: ${this.pokemon.counterTypes}`;

            return this.embed
                .setColor('BLUE')
                .setTitle(title)
                .setDescription(description)
                .setThumbnail(`http://www.pokestadium.com/sprites/xy/${imgName}.gif`);
        } else {
            return 'Pokemon not found.'
        }
    }
}