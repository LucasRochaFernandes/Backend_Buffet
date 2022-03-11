import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Inventory1647018731471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inventory",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "type",
            type: "enum",
            enum: ["salty", "candy"],
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "available",
            type: "boolean",
            default: false,
          },
          {
            name: "price",
            type: "numeric",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("inventory");
  }
}
