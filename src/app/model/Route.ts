export class Route {
    id: String;
    source: string;
    destination: string;
    distance: string;

    constructor(source: string, destination: string, distance: string) {
        this.source = source;
        this.destination = destination;
        this.distance = distance;
    }
}