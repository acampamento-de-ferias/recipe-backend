import { IsInt, Length, MaxLength } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Instruction } from "./Instruction";
@Entity("recipes")
export class Recipe {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3, 70)
    title: string;

    @Column()
    @MaxLength(250)
    description: string;

    @Column()
    @MaxLength(255)
    image: string;

    @Column()
    @IsInt()
    serving_size: number;

    @Column({ type: 'time' })
    preparation_time: string;

    @OneToMany(() => Instruction, (instruction) => instruction.recipe)
    instructions: Instruction[];

    @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
    ingredients: Ingredient[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}