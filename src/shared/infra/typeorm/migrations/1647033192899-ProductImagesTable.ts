import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductImagesTable1647033192899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product_images",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "product_id",
            type: "uuid"
          },
          {
            name: "image",
            type: "text",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
            {
                name: "FKproductImage",
                referencedTableName: "inventory",
                referencedColumnNames: ["id"],
                columnNames: ["product_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("product_images")
  }
}
