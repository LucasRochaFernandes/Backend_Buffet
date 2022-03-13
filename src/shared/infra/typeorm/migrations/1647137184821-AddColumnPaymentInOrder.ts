import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnPaymentInOrder1647137184821
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "payment",
        type: "enum",
        enum: ["card", "pix", "cash"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("orders", "payment");
  }
}
