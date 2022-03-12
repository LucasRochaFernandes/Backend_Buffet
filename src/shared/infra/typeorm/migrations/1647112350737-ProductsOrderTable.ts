import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductsOrderTable1647112350737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products_order",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "order_id",
            type: "uuid",
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "product_amount",
            type: "numeric",
          },
          {
            name: "total_product_price",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKorderProduct",
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            columnNames: ["order_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKproductInOrder",
            referencedTableName: "inventory",
            referencedColumnNames: ["id"],
            columnNames: ["product_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("products_order")
  }
}
