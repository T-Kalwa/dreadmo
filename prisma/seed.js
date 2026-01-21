const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // Clear existing data (optional but good for clean seed)
    await prisma.appointment.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.salon.deleteMany({});
    await prisma.user.deleteMany({});

    console.log('Clearing old data...');

    // Seed Users
    for (const user of dbData.users) {
        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role
            }
        });
    }
    console.log('Users seeded.');

    // Seed Salons
    for (const salon of dbData.salons) {
        const { reviews, specialties, gallery, hours, ...salonData } = salon;
        await prisma.salon.create({
            data: {
                ...salonData,
                specialties: JSON.stringify(specialties),
                gallery: JSON.stringify(gallery),
                hours: JSON.stringify(hours),
                reviews: {
                    create: reviews.map(r => ({
                        author: r.author,
                        rating: r.rating,
                        date: r.date,
                        comment: r.comment
                    }))
                }
            }
        });
    }
    console.log('Salons and Reviews seeded.');

    // Seed Services
    for (const service of dbData.services) {
        await prisma.service.create({
            data: service
        });
    }
    console.log('Services seeded.');

    // Seed Appointments
    // Check if user-client-1 exists, if not create a placeholder to avoid FK errors
    const clientUser = await prisma.user.findUnique({ where: { id: 'user-client-1' } });
    if (!clientUser) {
        await prisma.user.create({
            data: {
                id: 'user-client-1',
                email: 'client@example.com',
                name: 'Clara D.',
                password: 'password123',
                role: 'CLIENT'
            }
        });
    }

    for (const apt of dbData.appointments) {
        await prisma.appointment.create({
            data: {
                id: apt.id,
                date: apt.date,
                time: apt.time,
                status: apt.status,
                userId: apt.userId,
                salonId: apt.salonId,
                serviceId: apt.serviceId,
                clientName: apt.clientName
            }
        });
    }
    console.log('Appointments seeded.');

    console.log('Database seeded successfully! 🚀');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
