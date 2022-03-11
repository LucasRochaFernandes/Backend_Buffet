import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsInUser1646960762144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "email",
        type: "varchar",
        isNullable: false,
      })
    );
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "name",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "email");
    await queryRunner.dropColumn("users", "name");
  }
}
