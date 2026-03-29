import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import type { Services } from "../PetServices/EntityServices";
import type { User } from "../User/EntityUser";


@Entity("n_carrinho")
export class Cart {
    @PrimaryGeneratedColumn() 
    id!: number;

    @ManyToOne("Services", (se : any) => se.cartServices)
    @JoinColumn({name: "servicos_id"})
    services!: Services 

    @ManyToOne("User", (ur : any) => ur.cartUsers)
    @JoinColumn({name: "usuario_id"})
    users!: User 
    
}