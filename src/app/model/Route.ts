export class Route {
    id: String;
    source: string;
    destination: string;
    distance: string;

    constructor(id: String, source: string, destination: string, distance: string) {
        this.id = id;
        this.source = source;
        this.destination = destination;
        this.distance = distance;
    }
}