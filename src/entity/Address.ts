import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    street: string
    
    @Column()
    city: string

    @ManyToOne(() => User, user => user.addresses)
    user: User

}