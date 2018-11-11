import * as pokemon from '../../data/pokemon.json';
import * as cpMultipliers from '../../data/cp-multiplier.json';

export class Pokemon {
    public dexNum: number;
    public name: string;
    public alias: string;
    public form: string;
    public type1: Type;
    public type2: Type;
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
        // TODO: fix cp calculation. something's wrong (shrug)
        return (atk * def * sta * cpMultipliers[level]^2) / 10;
    }

    private getStat(baseStat: number, iv: number, level: number) {
        return (baseStat + iv);
    }

    private assignPokemon(name: string): void {
        name = name.toLowerCase();
        let foundPkmn = pokemon.find(pkmn => {
            return pkmn.name.toLowerCase().includes(name)
                || pkmn.alias.toLowerCase().includes(name);
        });

        Object.assign(this, foundPkmn);
    }
}

enum Type {
    BUG,
    DARK,
    DRAGON,
    ELECTRIC,
    FAIRY,
    FIGHTING,
    FIRE,
    FLYING,
    GHOST,
    GRASS,
    GROUND,
    ICE,
    NORMAL,
    POISON,
    PSYCHIC,
    ROCK,
    STEEL,
    WATER
}
