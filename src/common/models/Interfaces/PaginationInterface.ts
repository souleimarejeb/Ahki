import { isNumber, IsNumber, IsOptional, IsPositive } from "class-validator"

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
        this.resPerPage = res;
        this.currentPage = curr || 1;
        this.offset = this.resPerPage * (this.currentPage - 1);
    }
}