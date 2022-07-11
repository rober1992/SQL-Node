import knex from 'knex';

export const sqliteDB = knex({
    client: 'sqlite3',
    connection: { filename: './midbligera.sqlite' },
    useNullAsDefault: true,
});
  
export const mySQLDB = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'ecommerce',
    },
    pool: { min: 0, max: 7 },
});

export const dbInit = () => { 
  mySQLDB.schema.hasTable('productos').then((exists) => {
    if (!exists) {
      console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
      mySQLDB.schema
        .createTable('productos', (productosTable) => {
          productosTable.increments();
          productosTable.string('name').notNullable();
          productosTable.decimal('price', 4, 2);
          productosTable.string('description').notNullable();
          productosTable.string('thumbnail').notNullable();
          productosTable.integer('stock').notNullable();
          productosTable.string('code').notNullable();
          productosTable.timestamp('createdAt');
        })
        .then(() => {
          console.log('DONE');
        });
    };
  });
};

export const dbLiteInit = () => { 
  sqliteDB.schema.hasTable('messages').then((exists) => {
    if (!exists) {
      console.log('NO EXISTE LA TABLA messages. VAMOS A CREARLA');
      sqliteDB.schema
        .createTable('messages', (messagesTable) => {
          messagesTable.increments();
          messagesTable.string('content').notNullable();
          messagesTable.string('email').notNullable();
          messagesTable.timestamp('time');
        })
        .then(() => {
          console.log('DONE');
        });
    };
  });
};