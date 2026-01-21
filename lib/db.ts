import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'prisma', 'db.json');

export const getDb = () => {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
};

export const saveDb = (data: any) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

export const query = (collection: string) => {
    const db = getDb();
    return db[collection] || [];
};

export const insert = (collection: string, item: any) => {
    const db = getDb();
    if (!db[collection]) db[collection] = [];
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    db[collection].push(newItem);
    saveDb(db);
    return newItem;
};

export const update = (collection: string, id: string, updates: any) => {
    const db = getDb();
    const index = db[collection].findIndex((item: any) => item.id === id);
    if (index !== -1) {
        db[collection][index] = { ...db[collection][index], ...updates };
        saveDb(db);
        return db[collection][index];
    }
    return null;
};

export const remove = (collection: string, id: string) => {
    const db = getDb();
    db[collection] = db[collection].filter((item: any) => item.id !== id);
    saveDb(db);
};
