import { Injectable } from '@nestjs/common';
import { DEFAULT_RES_PER_PAGE, DEFAULT_SKIP } from 'src/common/Utils/constants';


@Injectable()
export class PaginatorService {
    constructor() { }


    setPaginator(itemperpa: number, page: number) {

        let resPerPage: number = itemperpa ?? DEFAULT_RES_PER_PAGE;
        let currentPage: number = page || 1;
        let offset: number = resPerPage * (currentPage - 1) || DEFAULT_SKIP;

        return {
            take: resPerPage,
            skip: offset
        }
    }
}
