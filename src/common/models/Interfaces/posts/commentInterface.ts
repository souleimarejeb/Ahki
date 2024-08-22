import { IPosts } from "./postInterface";
import { IUsers } from "../UserInterface";

export interface IComments {

    description: string;

    post: Partial<IPosts>;

    user: Partial<IUsers>;

}
