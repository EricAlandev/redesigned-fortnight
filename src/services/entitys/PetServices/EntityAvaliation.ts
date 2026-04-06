import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import type { Services } from "./EntityServices";

@Entity("avaliacao_servicos")
export class AvaliationServices {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    quantidade!: number;

    @Column("decimal" , {precision: 3, scale: 2})
    aprovacao_percentual!: number;

    @Column()
    servicos_id!: number;

    @OneToOne("NComentsUser", (coment: any) => coment.avaliacao)
    @JoinColumn({name: "servicos_id"})
    service!: Services
}
