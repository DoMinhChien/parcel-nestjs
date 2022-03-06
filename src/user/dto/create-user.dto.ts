export class CreateUserDto {
  public  id: string;
  public  email : string;
  public  password: string;
  public  address : string;
  public  phone: string;
  public  provinceCode: string;

    /**
     *
     */
    /**
     *
     */ 
     constructor(id: string, email: string, pass: string, phone: string, provincedCode : string);
    constructor(id: string, email: string, pass: string, phone: string, provincedCode : string) {
       this.id = id;
       this.email = email;
       this.password = pass;
       this.phone = phone;
       this.provinceCode = provincedCode;
        
    }
}
