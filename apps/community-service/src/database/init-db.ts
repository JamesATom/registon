// init-db.ts
import Knex from 'knex';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connection = Knex({
    client: 'pg',
    debug: false,
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '25060', 10),
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),  
        database: process.env.DB_NAME,
    }
});

async function initializeDatabase() {
    console.log('Initializing database...');

    try {
        // Check if public schema exists
        const schemaExists = await connection.raw(`
            SELECT schema_name 
            FROM information_schema.schemata 
            WHERE schema_name = 'public'
        `);

        // Create public schema if it doesn't exist
        if (schemaExists.rows.length === 0) {
            console.log('Public schema does not exist. Creating it...');
            await connection.raw('CREATE SCHEMA IF NOT EXISTS public');
            console.log('Public schema created successfully.');
        } else {
            console.log('Public schema already exists.');
        }

        console.log('Database initialization completed successfully.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        await connection.destroy();
    }
}

if (require.main === module) {
    initializeDatabase()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Database initialization failed:', error);
            process.exit(1);
        });
}

export { initializeDatabase };
