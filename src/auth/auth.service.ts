import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService{

    constructor(
        private jwtService: JwtService
    ){}

    async login(){
        return {access_token: this.jwtService.sign({content: 'telos_content'})}
    }
}