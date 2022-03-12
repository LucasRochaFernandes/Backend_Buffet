import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAmountColumnInInventory1647113296840
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "inventory",
      new TableColumn({
        name: "amount_available",
        type: "numeric",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("inventory", "amount_available");
  }
}
