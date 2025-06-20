// seed.city.ts
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    const cities = [
        { name: 'Tashkent' },
        { name: 'Nukus' },
        { name: 'Andijan' },
        { name: 'Bukhara' },
        { name: 'Fergana' },
        { name: 'Jizzakh' },
        { name: 'Namangan' },
        { name: 'Navoi' },
        { name: 'Samarkand' },
        { name: 'Gulistan' },
        { name: 'Termiz' },
        { name: 'Urgench' },
        { name: 'Qarshi' },
        { name: 'Navoi' },
    ];

    console.log('Seeding cities...');

    await knex('city').del();

    for (const city of cities) {
        const existingCity = await knex('city').where({ name: city.name }).first();

        if (!existingCity) {
            await knex('city').insert(city);
        }
    }

    console.log('Seeding completed.');
}
