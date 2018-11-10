import * as pokemon from '../../data/pokemon.json';

export class Pokemon {
    public name: string;
    public alias: string;
    public form: string;
    public type1: Type;
    public type2: Type;
    public maxCp: number;
    public maxCpWeather: number;

    constructor(name: string) {
        this.assignPokemon(name);
    }

    public get counterTypes(): string {
        // TODO: Impliment method
        return 'To be implimented';
    }

    private assignPokemon(name: string): void {
        // TODO: Update Pokemon data and search
        this.name = pokemon.find(pkmn => pkmn.toLowerCase() === name.toLowerCase());
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