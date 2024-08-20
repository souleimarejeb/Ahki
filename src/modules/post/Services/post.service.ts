import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { PostEntity } from 'src/common/models/db/Posts/posts.entities';
import { UserEntity } from 'src/common/models/db/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,

    ) { }

    async create(userId: string, postDetails: IPostInterface) {
        console.log(userId)
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new HttpException(
            'Post not found. Cannot Create post ', HttpStatus.BAD_REQUEST);
        const newComment = this.postRepository.create({
            ...postDetails,
            user,
        });
        try {
            const savedPost = await this.postRepository.save(newComment);
            return savedPost;
        } catch (error) {
            console.error("Error saving post:", error);
            throw new HttpException('Failed to create post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    findAll() {
        try {
            return this.postRepository.find({ relations: ['user', 'comments', 'reactions'] });
        } catch (error) {
            console.error("Error finiding posts:", error);
            throw new HttpException('Failed to find posts.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneQ(postId: string) {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post) throw new HttpException(
            'Post not found. Cannot dispaly it ', HttpStatus.BAD_REQUEST);
        try {
            return post;
        } catch (error) {
            console.error("Error loading  post:", error);
            throw new HttpException('Failed to load the post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updatePost: Partial<IPostInterface>) {
        try {
            const post = await this.postRepository.findOne({ where: { id: id } });
            if (!post) {
                throw new HttpException('Post not found. Cannot update it.', HttpStatus.BAD_REQUEST);
            }

            await this.postRepository.update({ id }, { ...updatePost });

            const updatedPost = await this.postRepository.findOne({ where: { id: id } });
            if (!updatedPost) {
                throw new HttpException('Post not found after update. Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return updatedPost;
        } catch (error) {
            console.error("Error updating post:", error);
            throw new HttpException('Failed to update the post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const post = await this.postRepository.findOne({ where: { id: id } });
        if (!post) throw new HttpException(
            'Post not found. Cannot delete it ', HttpStatus.BAD_REQUEST);
        try {
            return this.postRepository.delete({ id });
        } catch (error) {
            console.error("Error removing  post:", error);
            throw new HttpException('Failed to remove the post.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
