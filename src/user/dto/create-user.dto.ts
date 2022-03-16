export class CreateUserDto {
  public  id: string;
  public  email : string;
  public displayName: string;
  public  password: string;
  public  address : string;
  public  phone: string;
  public  provinceCode: string;
  public gender: number;

    /**
     *
     */
    /**
     *
     */ 
     constructor(id: string, email: string, displayName: string, password: string, phone: string, provincedCode : string, gender: number);
    constructor(id: string, email: string, displayName: string, password: string, phone: string, provincedCode : string, gender: number) {
       this.id = id;
       this.email = email;
       this.password = password;
       this.phone = phone;
       this.provinceCode = provincedCode;
        this.displayName = displayName;
        this.gender = gender;
    }
}
