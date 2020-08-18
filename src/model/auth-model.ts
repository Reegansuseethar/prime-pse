export class AuthModel{
    private name:string;
    private permission:string; //All  / none
    private password:string;

    constructor(name,permission,password){
        this.name = name;
        this.permission = permission;
        this.password = password;
    }
private authData = {
    user1:{
        "name": "Admin",
        "permission": "all",
        "password":"Admin"
    },
    user2:{
        "name": "myName",
        "permission": "none",
        "password":"test"
    }
}
}