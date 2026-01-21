const fs = require('fs');
const content = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String
  role          String    @default("CLIENT")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  salons        Salon[]   @relation("Owner")
  appointments  Appointment[]
}

model Salon {
  id            String    @id @default(cuid())
  name          String
  description   String?
  address       String
  city          String    @default("Montréal")
  image         String?
  category      String?
  ownerId       String
  owner         User      @relation("Owner", fields: [ownerId], references: [id])
  services      Service[]
  appointments  Appointment[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Service {
  id            String    @id @default(cuid())
  name          String
  price         Float
  duration      String
  salonId       String
  salon         Salon     @relation(fields: [salonId], references: [id])
  appointments  Appointment[]
}

model Appointment {
  id            String    @id @default(cuid())
  date          String
  time          String
  status        String    @default("PENDING")
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  salonId       String
  salon         Salon     @relation(fields: [salonId], references: [id])
  serviceId     String
  service       Service   @relation(fields: [serviceId], references: [id])
  createdAt     DateTime  @default(now())
}`;

fs.writeFileSync('prisma/schema.prisma', content, { encoding: 'utf8' });
console.log('File written in UTF-8 successfully');
