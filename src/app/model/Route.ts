export class Route {

    source: string;
    destination: string;
    distance: string;
    id: string;

    constructor(source: string, destination: string, distance: string) {

        this.source = source;
        this.destination = destination;
        this.distance = distance;
    }
}