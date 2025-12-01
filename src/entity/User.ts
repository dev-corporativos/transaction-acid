import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Address } from "./Address"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    age: number

    @ManyToMany(() => Address, address => address.users)
    addresses: Address[]

}
