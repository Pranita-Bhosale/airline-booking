
export class Schedule {
    source: string;
    destination: string;
    departureDateTime: string;
    arrivalDateTime: string;
    fare: string;
    duration: string;//route model
    planeId: string;
    id: string;

    constructor(source: string, destination: string, departureDateTime: string, arrivaldateTime: string, fare: string, planeId: string) {
        this.source = source;
        this.destination = destination;
        this.departureDateTime = departureDateTime;
        this.arrivalDateTime = arrivaldateTime;
        this.fare = fare;
        this.planeId = planeId;
    }
}
