
export interface UserData {
  username: string;
  password: string;
}

export class UserModel {
  public id: number;
  public email: string;
  public nickName: string;
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
    user.nickName = json.nickName;
    user.email = json.email;
    user.image = json.image;
    user.rating = json.rating;
    user.status = json.status;

    user.phoneNumber = json.phoneNumber;

    user.pushNotificationId = json.pushNotificationId;

    return user;
  }
}

export class UserCache {
  public token: string;
  public refreshToken: string;
  public user: UserModel;
}
