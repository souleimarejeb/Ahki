import { IUserInterface } from "./UserInterface";


export interface IPostInterface {

    title: string;

    tags: string;

    description: string;

    status: boolean;

    user: Partial<IUserInterface>;
}