import { IUsers } from "../UserInterface";



export interface IPosts {

    title: string;

    tags: string;

    description: string;

    status: boolean;

    user: Partial<IUsers>;
}