import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Content{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "varchar",
        length: 100
    })
    title: string

    @Column({
        type: "varchar",
        length: 100
    })
    seconds: string 

    @Column({
        type: "int",
        default: (new Date()).getFullYear()
    })
    year: number

    @Column({
        type: "varchar",
        length: 200
    })
    url: string
}