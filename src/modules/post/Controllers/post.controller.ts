import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from '../Services/post.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';


@Controller('post')
@ApiTags('Post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @ApiQuery({
        name: "userId",
        type: String,
        description: "A parameter. Optional",
        required: false
    })
    @Post('/addPost')
    async addnew(
        @Body() newpost: IPostInterface,
        @Query('userId') userId?: string,
    ) {
        console.log(userId)
        try {
            return await this.postService.create(userId, newpost);
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

    @Get('one_post')
    async findOne(@Query('postId') postId?: string) {
        try {
            return await this.postService.findOneQ(postId);
        } catch (error) {
            console.error('Error in findOne:', error);
            throw new Error('Unable to retrieve a post');
        }
    }

    @ApiQuery({
        name: "postId",
        type: String,
        description: "A parameter. Optional",
        required: false
    })
    @Patch('update')
    update(
        @Body() post: Partial<IPostInterface>,
        @Query('postId') postId?: string
    ) {
        try {
            return this.postService.update(postId, post);
        } catch (error) {
            console.error('Error in update:', error);
            throw new Error('Unable to update a post');
        }
    }

    @Delete('/delete')
    async remove(@Query('postId') postId?: string,) {
        try {
            return await this.postService.remove(postId);
        } catch (error) {
            console.error('Error in remove:', error);
            throw new Error('Unable to remove  a post');
        }
    }
}
