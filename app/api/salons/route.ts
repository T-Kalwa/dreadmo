import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get('ownerId');
    const id = searchParams.get('id');

    try {
        if (id) {
            const salon = await prisma.salon.findUnique({
                where: { id },
                include: { reviews: true, services: true }
            });
            if (!salon) return NextResponse.json({ error: 'Salon not found' }, { status: 404 });

            // Parse JSON strings
            return NextResponse.json({
                ...salon,
                specialties: salon.specialties ? JSON.parse(salon.specialties) : [],
                gallery: salon.gallery ? JSON.parse(salon.gallery) : [],
                hours: salon.hours ? JSON.parse(salon.hours) : {}
            });
        }

        if (ownerId) {
            const salon = await prisma.salon.findFirst({
                where: { ownerId },
                include: { reviews: true, services: true }
            });
            if (!salon) return NextResponse.json({ error: 'Salon not found' }, { status: 404 });
            return NextResponse.json({
                ...salon,
                specialties: salon.specialties ? JSON.parse(salon.specialties) : [],
                gallery: salon.gallery ? JSON.parse(salon.gallery) : [],
                hours: salon.hours ? JSON.parse(salon.hours) : {}
            });
        }

        const salons = await prisma.salon.findMany({
            include: { reviews: true, services: true }
        });

        const parsedSalons = salons.map((salon: any) => ({
            ...salon,
            specialties: salon.specialties ? JSON.parse(salon.specialties) : [],
            gallery: salon.gallery ? JSON.parse(salon.gallery) : [],
            hours: salon.hours ? JSON.parse(salon.hours) : {}
        }));

        return NextResponse.json(parsedSalons);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, ...data } = body;

        const updatedSalon = await prisma.salon.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                address: data.address,
                city: data.city,
                image: data.image,
                gallery: data.gallery ? JSON.stringify(data.gallery) : undefined,
                hours: data.hours ? JSON.stringify(data.hours) : undefined,
                specialties: data.specialties ? JSON.stringify(data.specialties) : undefined,
            }
        });

        return NextResponse.json(updatedSalon);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update salon' }, { status: 500 });
    }
}
