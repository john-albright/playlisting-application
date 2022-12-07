export interface UserInterface {
    username: string;
    isAdmin: boolean;
    id: string;
}

export interface DatabaseUserInterface {
    username: string;
    password: string;
    isAdmin: boolean;
    created_on: Date;
    _id: string;
  }