exports.up = function (knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments('id').primary();
        table.string('google_id').notNullable();
        table.string('username').notNullable();
        table.string('name').notNullable();
        table.string('avatar_url').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('friends', (table) => {
        table.increments('id').primary();
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .integer('friend_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('recipes', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('instructions').notNullable();
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.integer('likes').notNullable().defaultTo(0);
        table.string('category').notNullable();
        table.string('photo').notNullable().defaultTo(`http://localhost:5050/public/menu.png`);
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('comments', (table) => {
        table.increments('id').primary();
        table.string('content').notNullable();
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .integer('recipe_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('recipes')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('saves', (table) => {
        table.increments('id').primary();
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .integer('recipe_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('recipes')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('ingredients', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('category').notNullable();
        table.string('dietary').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('recipe_ingredient', (table) => {
        table.increments('id').primary();
        table
          .integer('recipe_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('recipes')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .integer('ingredient_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('ingredients')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.integer('qty').notNullable().defaultTo(0);
        table.string('unit').notNullable().defaultTo('ea')
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('recipe_ingredient').dropTable('ingredients').dropTable('comments').dropTable('saves').dropTable('recipes').dropTable('users');
  };