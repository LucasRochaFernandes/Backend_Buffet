import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UsersTokensTable1646958791605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "userstoken",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "refresh_token",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "expires_date",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserToken",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("userstoken");
  }
}
