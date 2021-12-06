import {Module} from "@nestjs/common"
import {AuthService} from "./auth.service" 
import {PassportModule} from "@nestjs/passport"
import {JwtModule} from "@nestjs/jwt"
import {JwtStrategy} from "./jwt.strategy";

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '60m' }
        })
    ],
    providers: [AuthService, JwtModule, JwtStrategy],
    exports: [AuthService, JwtModule]
})

export class AuthModule{}