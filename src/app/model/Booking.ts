export class Booking {
    id:string;
    source: string;
    destination: string;
    journeyDateTime: string;
    fare: string;
    seatNumber:string;
    bookingDateTime:string;
    bookedBy:string;
    planeId:string;

    constructor(source: string, destination: string, journeyDateTime: string, fare: string, username:string, planeId:string) {
        this.source=source;
        this.destination = destination;
        this.journeyDateTime = journeyDateTime;
        this.fare = fare;
        this.bookedBy = username;
        this.planeId = planeId;
    }

}

