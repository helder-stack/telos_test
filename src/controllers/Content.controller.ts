import {Controller, Body, UploadedFile, UseInterceptors, Res, Param, Inject, Get, Post, Put, Delete, UseGuards} from "@nestjs/common"
import {ContentService} from "../services/Content.service"
import {Content} from '../database/entities/Content.entity';
import {FileInterceptor} from '@nestjs/platform-express';
import { Express } from 'express';
import * as fs from 'fs';

import IFileVideo from '../interfaces/IFileVideo';
import IVideo from "../interfaces/IVideo"

import { InjectRepository } from '@nestjs/typeorm';

import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/jwtAuth.guard";

@Controller("content")
export class ContentController{

    constructor(
        private contentService:ContentService,
        private authService: AuthService
    ){}

    @Get('auth')
    async authenticate(){
        return await this.authService.login()
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getContents(): Promise<Content[]>{

        let contents = await this.contentService.findAll()
        return contents
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('video'))
    async uploadFile(@UploadedFile() file, @Body() data) {

        let movie: IVideo = file
        let title: string = data.title 
        let year: number = data.year

        try{

            return await this.contentService.addNewVideo(movie, title, year)

        }catch(e){
            return e
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getVideoById(@Param() videoId): Promise<Content>{
        return await this.contentService.findById(videoId.id)
    }

    @Get('watch/:videoName')
    findVideo(@Param('videoName') video, @Res() res){
        return res.sendFile(`${process.cwd()}/uploads/videos/${video}`)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateVideo(@Body() video){
        return await this.contentService.updateContent(video.id, video.title, video.year)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteVideo(@Param("id") videoId){
        return await this.contentService.deleteContent(videoId)
    }
}