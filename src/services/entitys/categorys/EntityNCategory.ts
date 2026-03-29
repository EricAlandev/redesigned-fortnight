import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import type { Services } from "../PetServices/EntityServices";
import type { CategorysServices } from "./EntityCategoryService";

@Entity("categorias_servicos")
export class NCategorysServices {
    @PrimaryGeneratedColumn() 
    id!: number;

    @ManyToOne("CategorysServices", (cS: any) => cS.NCategoryCategory)
    @JoinColumn({name: "categoria_id"})
    categorias!: CategorysServices

    @ManyToOne("CategorysServices", (cS: any) => cS.NCategoryServices)
    @JoinColumn({name: "servicos_id"})
    servicos!: Services

}