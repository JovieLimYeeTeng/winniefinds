// This file configures the database connection using Knex.
const knex = require('knex')({
  client: 'sqlite3', // We are using SQLite
  connection: {
    filename: './winnie-finds.db', // The database will be stored in this file
  },
  useNullAsDefault: true, // A required setting for SQLite
});

// Function to set up the database table
async function setupDatabase() {
  // Check if the 'products' table already exists
  const tableExists = await knex.schema.hasTable('products');
  if (!tableExists) {
    // If it doesn't exist, create it
    console.log('Creating "products" table...');
    await knex.schema.createTable('products', (table) => {
      table.increments('id').primary(); // A unique ID for each product
      table.string('name').notNullable(); // The product's name
      table.decimal('price', 14, 2).notNullable(); // The product's price
      table.integer('stock').notNullable().defaultTo(1); // The stock count, defaults to 1
      table.string('image_url'); // The URL for the product image
    });
    console.log('"products" table created.');
  } else {
    console.log('"products" table already exists.');
  }
}

// Export the knex instance and the setup function
module.exports = {
  knex,
  setupDatabase,
};