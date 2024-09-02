import { isNumber, IsNumber, IsOptional, IsPositive } from "class-validator"
import { DEFAULT_RES_PER_PAGE, DEFAULT_SKIP } from "src/common/Utils/constants";

export class IPagination {


    @IsNumber()
    @IsOptional()
    @IsPositive()
    resPerPage?: number

    @IsNumber()
    @IsOptional()
    @IsPositive()
    currentPage?: number
    @IsNumber()
    @IsOptional()
    @IsPositive()
    offset: number;

    setPagination(res: number, curr: number) {
        this.resPerPage = res ?? DEFAULT_RES_PER_PAGE;
        this.currentPage = curr || 1;
        this.offset = this.resPerPage * (this.currentPage - 1) || DEFAULT_SKIP;
    }
}