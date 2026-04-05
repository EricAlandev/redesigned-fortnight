import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import type { Services } from "./EntityServices";

@Entity("avaliacao_servicos")
export class AvaliationServices {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    quantidade!: number;

    @Column()
    aprovacao_percentual!: number;

    @OneToOne("NComentsUser", (coment: any) => coment.avaliacao)
    service!: Services
}
