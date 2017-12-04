export class UserAuthRequest {
  username: string;
  email: string;
  password: string;
  address?: Array<string>;
  confirm_password: string;
  constructor(userForm) {
    this.username = userForm.username;
    this.email = userForm.email;
    this.password = userForm.password;
    this.confirm_password = userForm.confirm_password;
    this.address = userForm.address;
  }
}

export class UserModel {
  public id: number;
  public email: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public rating: string;
  public status: string;
  public image?: string;
  public phoneNumber?: string;

  public pushNotificationId: string;

  static FromJson(json: any): UserModel {
    const user = new UserModel();

    user.id = json.id;
    user.firstName = json.firstName;
    user.lastName = json.lastName;
    user.username = json.username;
    user.email = json.email;
    user.image = json.image || null;
    user.rating = json.rating || null;
    user.status = json.status || null;

    user.phoneNumber = json.phoneNumber || null;

    user.pushNotificationId = json.pushNotificationId;

    return user;
  }
}

export class UserCache {
  public token: any;
  public refreshToken: string;
  public user: UserModel;
}
