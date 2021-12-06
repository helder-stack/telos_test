import { Injectable, Inject } from '@nestjs/common';
import {join} from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

//video lib imports
import IFileVideo from '../interfaces/IFileVideo';
import IVideo from '../interfaces/IVideo';
import {MovieParser, relativeDuration} from 'node-video-lib';
import {getVideoDurationInSeconds } from "get-video-duration";

//database imports
import {ContentRepository} from "../repositories/Content.repository";
import {Content} from "../database/entities/Content.entity"
import ContentDTO from '../DTOs/IContent.dto';

dotenv.config();

@Injectable()
export class ContentService{
    
    constructor(
        private contentRepository: ContentRepository
    ){}

    async findAll(){

        let contents: Content[] = await this.contentRepository.find()
        return contents
    
    }

    async addNewVideo(movie: IVideo, title: string, year: number){
        
        let {originalname, encoding, mimetype, buffer} = movie
        
        //pega as informações do vídeo
        let videoMimetypeData = mimetype.split('/')

        if(videoMimetypeData[0] != 'video'){
            return "Incorrect format. Send only videos!"
        }

        //cria um timeStamp para guardar quando o vídeo foi salvo
        let timeStamp = Date.now()

        //cria o nome do arquivo e o formata para remover os espaços
        let video_name = `${timeStamp}_${title.replace(' ', '_')}.${videoMimetypeData[1]}`
        video_name = video_name.replace(' ', '_')

        //cria a URL com base no .env
        let url =  `${process.env.BASE_URL}/content/watch/${video_name}`
        let pathToVideo = `uploads/videos/${video_name}`


        //pega o base64 do buffer recebido e escreve no servidor
        let base64 = Buffer.from(buffer).toString('base64')
        await fs.writeFileSync(pathToVideo, buffer);

        //abre o arquivo criado
        let videoFile = fs.openSync(pathToVideo, 'r');

        //utiliza a lib node-video-lib para pegar os segundos do vídeo
        let videoInformations = MovieParser.parse(videoFile)
        let videoSeconds = videoInformations.relativeDuration().toString()

        //cria as informações do conteúdo a ser salvo 
         let objectToSave: ContentDTO = {
            title,
            seconds: videoSeconds,
            url,
            year
        }

        //salva no banco
        try {

            let newVideo = await this.contentRepository.createVideo(objectToSave)
            
            return newVideo        

        } catch (e) {
            console.log(e)
            fs.unlinkSync(pathToVideo)
            return {
                error: "Video was not save",
            }
        }
        
    }

    async findById(id: string){
        return await this.contentRepository.findById(id)
    }

    async updateContent(id, title, year){
        
        let currentContent = await this.contentRepository.findById(id);

        if(currentContent){
            return await this.contentRepository.updateContent(currentContent, title, year)
        }else{
            return "Content was not found!"
        }

    }

    async deleteContent(id){
        let currentContent = await this.contentRepository.findById(id);
        if(currentContent){
            return await this.contentRepository.deleteContent(currentContent)
        }else{
            return "Content was not found!"
        }
    }

}