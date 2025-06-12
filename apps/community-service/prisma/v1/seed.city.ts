import { PrismaClient } from '../../src/common/prisma/client/v1';

const prisma = new PrismaClient();

async function main() {
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

    for (const city of cities) {
        const existingCity = await prisma.city.findFirst({
            where: { name: city.name },
        });

        if (!existingCity) {
            await prisma.city.create({
                data: city,
            });
        }
    }

    console.log('Seeding completed.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
