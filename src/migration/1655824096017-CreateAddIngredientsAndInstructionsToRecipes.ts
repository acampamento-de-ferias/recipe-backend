import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class CreateAddIngredientsAndInstructionsToRecipes1655824096017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('recipes', new TableColumn({
            name: "ingredient_id",
            type: "int",
        }));

        await queryRunner.addColumn('recipes', new TableColumn({
            name: "instruction_id",
            type: "int",
        }));

        await queryRunner.createForeignKey(
            "recipes",
            new TableForeignKey({
                columnNames: ["ingredient_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "ingredients",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createForeignKey(
            "recipes",
            new TableForeignKey({
                columnNames: ["instruction_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "instructions",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("recipes")

        const foreignKeyIngredients = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("ingredient_id") !== -1,
        );

        const foreignKeyInstruction = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("instruction_id") !== -1,
        );

        await queryRunner.dropForeignKey("recipes", foreignKeyIngredients)
        await queryRunner.dropColumn("recipes", "ingredient_id")

        await queryRunner.dropForeignKey("recipes", foreignKeyInstruction)
        await queryRunner.dropColumn("recipes", "instruction_id")
    }

}
