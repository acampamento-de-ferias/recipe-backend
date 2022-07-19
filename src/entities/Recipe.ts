import { IsInt, IsOptional, Length, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Ingredient } from './Ingredient';
import { Instruction } from './Instruction';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 70)
  title: string;

  @Column({ nullable: true })
  @MaxLength(250)
  @IsOptional()
  description: string;

  @Column({ nullable: true })
  @MaxLength(255)
  @IsOptional()
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
