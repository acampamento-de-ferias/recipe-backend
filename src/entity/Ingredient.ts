import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./Recipe";

@Entity("ingredients")
export class Ingredient {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    recipe_id: number;

    @ManyToOne(() => Recipe)
    @JoinColumn({name: "recipe_id"})
    recipe: Recipe;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;  
    
}