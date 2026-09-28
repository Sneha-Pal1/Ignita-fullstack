import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingEventCategoryEnumValues1710000000000
  implements MigrationInterface
{
  name = 'AddMissingEventCategoryEnumValues1710000000000';
  transaction = false;

  public async up(queryRunner: QueryRunner): Promise<void> {
    const enumValues = [
      'HACKATHON',
      'INTERNSHIP',
      'CODING_FEST',
      'WORKSHOP',
      'CONTEST',
      'JOB',
      'INTERVIEW',
      'QUIZ',
    ];

    for (const value of enumValues) {
      await queryRunner.query(`
        DO $$
        BEGIN
          IF EXISTS (
            SELECT 1 FROM pg_type WHERE typname = 'events_category_enum'
          ) AND NOT EXISTS (
            SELECT 1 FROM pg_type t
            JOIN pg_enum e ON t.oid = e.enumtypid
            WHERE t.typname = 'events_category_enum' AND e.enumlabel = '${value}'
          ) THEN
            ALTER TYPE events_category_enum ADD VALUE '${value}';
          END IF;
        END
        $$;
      `);
    }
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL enum values cannot be easily removed without dropping/recreating the enum type.
  }
}
