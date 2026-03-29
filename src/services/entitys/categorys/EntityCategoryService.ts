import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import type { NCategorysServices } from "./EntityNCategory";

@Entity("categorias_servicos")
export class CategorysServices {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    categoria!: string;

    @OneToMany("NCategorysServices", (category : any) => category.categorias)
    NCategoryCategory!: NCategorysServices[];
}