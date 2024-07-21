export class ForgotPassword{
username:String;
mobileNo:String;
newPassword:String;

constructor(username:String, newPassword:String,  mobileNo:String,){
this.username=username;
this.mobileNo=mobileNo;
this.newPassword=newPassword;
}
}