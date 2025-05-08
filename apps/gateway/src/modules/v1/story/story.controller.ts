// story.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { StoryService } from './story.service';

@Controller({ path: 'story', version: '1' })
export class StoryController {
    constructor(private readonly storyService: StoryService) {}

    @Get()
    getAllStory() {
        return this.storyService.getAllStory();
    }

}