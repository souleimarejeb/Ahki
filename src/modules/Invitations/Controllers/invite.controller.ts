import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InviteService } from '../Services/invite.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('invite')
@ApiTags('Invite')

export class InviteController {
    constructor(private readonly inviteservice: InviteService) { }

    @Post()
    create(@Body() invite: IInvite) {
        return this.inviteservice.create(invite);
    }

    @Get()
    findAll() {
        return this.inviteservice.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.inviteservice.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() invite: Partial<IInvite>) {
        return this.inviteservice.update(id, invite);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.inviteservice.remove(id);
    }
}
