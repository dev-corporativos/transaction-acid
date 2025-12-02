import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Address } from "./Address"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    age: number

    @OneToMany(() => Address, address => address.user)
    addresses: Address[]

}
