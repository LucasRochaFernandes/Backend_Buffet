import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class OrdersTable1647108050855 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "type",
            type: "enum",
            enum: ["local", "delivery"],
          },
          {
            name: "done",
            type: "boolean",
            default: false,
          },
          {
            name: "total",
            type: "numeric",
            isNullable: false,
          },
          {
            name: "finished_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys:[{
            name: "FKuserOrder",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("orders")
  }
}
