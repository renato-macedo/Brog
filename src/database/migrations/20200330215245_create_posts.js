exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id');

      table
        .string('username', 50)
        .unique()
        .notNullable();

      table
        .string('email', 150)
        .unique()
        .notNullable();

      table.string('name', 150).notNullable();

      table.string('password', 150).notNullable();
    })
    .createTable('posts', table => {
      table.increments('id');

      table.string('title', 100).notNullable();

      table.string('description', 150);

      table.text('content').notNullable();

      table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.datetime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));

      table.string('author', 50);
      table.foreign('author').references('users.username');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts').dropTable('users');
};
