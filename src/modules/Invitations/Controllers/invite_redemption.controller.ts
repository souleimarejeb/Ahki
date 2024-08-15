import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InviteRedemptionService } from '../Services/invite_redemption.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('invite-redemption')
@ApiTags('Invite-redemption')
export class InviteRedemptionController {
    constructor(private readonly InvitationRemdpService: InviteRedemptionService) { }

    @Post()
    create(@Body() inviteRedmp: IInviteRedemption) {
        return this.InvitationRemdpService.create(inviteRedmp);
    }

    @Get()
    findAll() {
        return this.InvitationRemdpService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.InvitationRemdpService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() inviteRedmp: Partial<IInviteRedemption>) {
        return this.InvitationRemdpService.update(id, inviteRedmp);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.InvitationRemdpService.remove(id);
    }
}
