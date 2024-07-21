export class ForgotPassword{
username:String;
mobileNo:String;
password:String;

constructor(username:String, password:String,  mobileNo:String,){
this.username=username;
this.mobileNo=mobileNo;
this.password=password;
}
}