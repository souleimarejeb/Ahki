import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenHistoryService } from '../Services/token_history.service';
import { ApiTags } from '@nestjs/swagger';
import { ITokenHistory } from 'src/common/models/Interfaces/tokeHistoryInterface';


@Controller('token-history')
@ApiTags('Token-History')
export class TokenHistoryController {
    constructor(private readonly tokenHistoryService: TokenHistoryService) { }

    @Post(':id')
    create(@Body() tokeHistory: ITokenHistory, @Param('id') id: string) {
        return this.tokenHistoryService.create(id, tokeHistory);
    }

    @Get()
    findAll() {
        return this.tokenHistoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tokenHistoryService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() tokeHistory: Partial<ITokenHistory>) {
        return this.tokenHistoryService.update(id, tokeHistory);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tokenHistoryService.remove(id);
    }
}
