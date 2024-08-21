import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from '../Services/post.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPostInterface } from 'src/common/models/Interfaces/postInterface';


@Controller('post')
@ApiTags('Post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @ApiQuery({
        name: "userId",
        type: String,
        description: "A parameter. not Optional",
        required: true
    })
    @Post('/user')
    async addnew(
        @Body() payloads: IPostInterface,
        @Query('userId') userId?: string,
    ) {
        try {
            return await this.postService.create(userId, payloads);
        } catch (error) {
            console.error('Error in create:', error);
            throw new Error('Unable to create posts');
        }
    }

    @Get()
    findAll() {
        try {
            return this.postService.findAll();
        } catch (error) {
            console.error('Error in findAll:', error);
            throw new Error('Unable to retrieve posts');
        }
    }

    @Get(':postId')
    async findOne(@Param('postId') postId: string) {
        try {
            return await this.postService.findOne(postId);
        } catch (error) {
            console.error('Error in findOne:', error);
            throw new Error('Unable to retrieve a post');
        }
    }

    @Patch(':postId')
    update(
        @Body() payloads: Partial<IPostInterface>,
        @Param('postId') postId: string
    ) {
        try {
            return this.postService.update(postId, payloads);
        } catch (error) {
            console.error('Error in update:', error);
            throw new Error('Unable to update a post');
        }
    }

    @Delete(':postId')
    async remove(@Param('postId') postId: string,) {
        try {
            return await this.postService.remove(postId);
        } catch (error) {
            console.error('Error in remove:', error);
            throw new Error('Unable to remove  a post');
        }
    }
}
