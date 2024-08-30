import { IPosts } from "./postInterface";
import { IUsers } from "../UserInterface";

export interface IBookmarks {

    post: Partial<IPosts>;

    user: Partial<IUsers>;

}
