import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenSourceService } from '../Services/token_source.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('token-source')
@ApiTags('Token-Source')
export class TokenSourceController {
    constructor(private readonly tokenSourceService: TokenSourceService) { }

    @Post()
    create(@Body() tokeSource: ITokenSource) {
        return this.tokenSourceService.create(tokeSource);
    }

    @Get()
    findAll() {
        return this.tokenSourceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tokenSourceService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() tokeSource: Partial<ITokenSource>) {
        return this.tokenSourceService.update(id, tokeSource);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tokenSourceService.remove(id);
    }
}
