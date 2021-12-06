import { getRepository, Repository } from 'typeorm';
import {Content} from '../entities/Content.entity'

export const ContentProvider = [
    {
        provide: 'CONTENT_REPOSITORY',
        useFactory: () => getRepository(Content),
        inject: ['DATABASE_CONNECTION']
    }
]