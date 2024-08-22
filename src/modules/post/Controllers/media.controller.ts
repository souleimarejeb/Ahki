import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaService } from '../Services/media.service';
import { ApiTags } from '@nestjs/swagger';
import { IMediaInterface } from 'src/common/models/Interfaces/mediaInterface';


@Controller('media')
@ApiTags('Media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post()
    create(@Body() media: IMediaInterface) {
        return this.mediaService.create(media);
    }

    @Get()
    findAll() {
        return this.mediaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mediaService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() media: Partial<IMediaInterface>) {
        return this.mediaService.update(id, media);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mediaService.remove(id);
    }
}
