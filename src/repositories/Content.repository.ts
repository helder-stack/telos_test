import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Content} from '../database/entities/Content.entity';
import ContentDTO from '../DTOs/IContent.dto';

@Injectable()
export class ContentRepository{
    
    constructor(
        @Inject("CONTENT_REPOSITORY")
        private contentRepository: Repository<Content>
    ){}

    async find(): Promise <Content[]>{
        return this.contentRepository.find()
    }

    async createVideo(contentData: ContentDTO): Promise<Content>{
        let newVideo = await this.contentRepository.create(contentData)
        await this.contentRepository.save(newVideo)
        
        return newVideo

    }

    async findById(id: string): Promise <Content>{
        return await this.contentRepository.findOne({
            id
        })
    }

    async updateContent(content: Content, title: string, year: number){
        content.title = title 
        content.year = year
        return await this.contentRepository.save(content)
    }

    async deleteContent(content: Content){
        return await this.contentRepository.remove(content)
    }
}