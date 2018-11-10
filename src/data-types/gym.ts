import * as gyms from '../../data/gyms.json';

export class Gym {
    public name: string;
    public alias: string;
    public longitude: number;
    public latitude: number;
    public errorMessage = '';

    constructor(search: string) {
        this
        this.assignGym(search);
    }

    private assignGym(search: string): void {
        let gymSearch = gyms.filter(g => {
            return g.name.toLowerCase().includes(search.toLowerCase())
                // TODO: add alias field to json
                // || g.alias.toLowerCase().includes(search.toLowerCase())
        });

        if (gymSearch.length > 1) {
            this.errorMessage = 'More than one gym has been found.'
        } else if (gymSearch.length === 0) {
            this.errorMessage = 'Unable to find Gym.'
        } else {
            Object.assign(gymSearch[0]);
        }
    }
}