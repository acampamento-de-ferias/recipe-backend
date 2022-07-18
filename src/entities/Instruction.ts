import { Length } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Recipe } from './Recipe';

@Entity('instructions')
export class Instruction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3, 170)
    name: string;

    @Column()
    recipe_id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.instructions, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
