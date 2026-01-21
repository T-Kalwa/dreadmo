import { NextResponse } from 'next/server';
import { query, insert } from '@/lib/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get('salonId');

    const services = query('services');
    const filtered = salonId ? services.filter((s: any) => s.salonId === salonId) : services;

    return NextResponse.json(filtered);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const service = insert('services', {
            name: body.name,
            price: body.price,
            duration: body.duration,
            salonId: body.salonId,
        });
        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
