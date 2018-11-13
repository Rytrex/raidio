import * as pokemon from '../../data/pokemon.json';
import * as cpMultipliers from '../../data/cp-multiplier.json';

export class Pokemon {
    public dexNum: number;
    public name: string;
    public alias: string;
    public form: string;
    public type1: string;
    public type2: string;
    public generation: number;
    public baseAtk: number;
    public baseDef: number;
    public baseSta: number;

    constructor(name: string) {
        this.assignPokemon(name);
    }

    public get counterTypes(): string {
        // TODO: Impliment method
        return 'To be implimented';
    }

    public getCP(level: number, ivs: {atk: number, def: number, sta: number}): number {
        let atk = this.baseAtk + ivs.atk;
        let def = Math.sqrt(this.baseDef + ivs.def);
        let sta = Math.sqrt(this.baseSta + ivs.sta);
        let cpm = Math.pow(cpMultipliers[level], 2);

        return Math.floor((atk * def * sta * cpm) / 10);
    }

    private getStat(baseStat: number, iv: number, level: number) {
        return (baseStat + iv);
    }

    private assignPokemon(name: string): void {
        name = name.toLowerCase();
        let foundPkmn = pokemon.find(pkmn => {
            return (name.includes(pkmn.name.toLowerCase()) && name.includes(pkmn.alias.toLowerCase()))
                || pkmn.alias.toLowerCase().includes(name);
        });

        Object.assign(this, foundPkmn);
    }
}

class PokemonType {
    public readonly Bug = 'Bug';
    public readonly Dark = 'Dark';
    public readonly Dragon = 'Dragon';
    public readonly Electric = 'Electric';
    public readonly Fairy = 'Fairy';
    public readonly Fighting = 'Fighting';
    public readonly Fire = 'Fire';
    public readonly Flying = 'Flying';
    public readonly Ghost = 'Ghost';
    public readonly Grass = 'Gross';
    public readonly Ground = 'Ground';
    public readonly Ice = 'Ice';
    public readonly Normal = 'Normal';
    public readonly Poison = 'Poison';
    public readonly Psychic = 'Psychic';
    public readonly Rock = 'Rock';
    public readonly Steel = 'Steel';
    public readonly Water = 'Water';
}
