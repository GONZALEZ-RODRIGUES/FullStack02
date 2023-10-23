/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", function (t) {
      t.increments("id").primary();
      t.string("email", 32).unique().notNullable().index();
      t.string("full_name").notNullable();
      t.string("phone_number");
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("users");
  };
  