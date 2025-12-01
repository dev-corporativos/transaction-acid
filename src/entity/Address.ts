import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./User"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    street: string
    
    @Column()
    city: string

    @OneToMany(() => User, user => user.addresses)
    users: User[]

}