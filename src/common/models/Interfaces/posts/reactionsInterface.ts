import { IUsers } from "../UserInterface";
import { IPosts } from "./postInterface";

export interface IReactions {

    type: string;

    post: Partial<IPosts>;

    user: Partial<IUsers>;
}