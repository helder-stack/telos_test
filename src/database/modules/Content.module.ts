import { ContentRepository } from '../../repositories/Content.repository';
import {Module} from "@nestjs/common"
import {DatabaseModule} from "./database.module";
import {ContentProvider} from '../providers/Content.providers';
import {ContentService} from "../../services/Content.service";
import {ContentController} from '../../controllers/Content.controller';
import {AuthModule} from '../../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [ContentController],
    providers: [
        ...ContentProvider,
        ContentService, 
        ContentRepository],
})

export class ContentModule{}