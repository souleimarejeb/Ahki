import { IPostInterface } from "./postInterface";
import { IUserInterface } from "./UserInterface";

export interface IComments {

    description: string;

    post: Partial<IPostInterface>;

    user: Partial<IUserInterface>;

}
