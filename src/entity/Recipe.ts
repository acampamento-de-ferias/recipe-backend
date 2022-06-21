import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("recipes")
export class Recipe {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    serving_size: number;

    @Column()
    preparation_time: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}