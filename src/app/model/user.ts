export class user {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    gender: string;
    age: number;

    constructor(title: string, firstName: string, lastName: string, email: string, mobileNumber: string, gender: string, age: number) {
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.gender = gender;
        this.age = age;
    }
}