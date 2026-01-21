import { NextResponse } from 'next/server';
import { query, insert } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const appointments = query('appointments');
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const appointment = insert('appointments', {
            date: body.date,
            time: body.time,
            userId: body.userId || null,
            salonId: body.salonId,
            serviceId: body.serviceId,
            clientName: body.clientName,
            clientEmail: body.clientEmail,
            clientPhone: body.clientPhone,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
        });
        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
    }
}
