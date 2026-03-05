import { PrismaClient, ReservationStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clean existing data
  await prisma.reservation.deleteMany()

  // Sample reservations
  const reservations = [
    {
      confirmationCode: 'BEL-A3F7K',
      date: new Date('2026-03-07'),
      time: '19:30',
      guests: 4,
      name: 'Jean-Pierre Müller',
      email: 'jp.muller@example.com',
      phone: '+41 79 123 45 67',
      notes: 'Anniversary dinner',
      language: 'fr',
      status: ReservationStatus.CONFIRMED,
    },
    {
      confirmationCode: 'BEL-B2N5M',
      date: new Date('2026-03-08'),
      time: '18:00',
      guests: 2,
      name: 'Maria Rossi',
      email: 'maria.rossi@example.com',
      phone: '+41 78 987 65 43',
      notes: null,
      language: 'en',
      status: ReservationStatus.PENDING,
    },
    {
      confirmationCode: 'BEL-C9L8P',
      date: new Date('2026-03-08'),
      time: '19:00',
      guests: 6,
      name: 'Thomas Schneider',
      email: 't.schneider@example.com',
      phone: '+41 76 555 44 33',
      notes: 'Birthday celebration - need large table',
      language: 'de',
      status: ReservationStatus.PENDING,
    },
    {
      confirmationCode: 'BEL-D4R2T',
      date: new Date('2026-03-09'),
      time: '12:30',
      guests: 3,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+41 77 111 22 33',
      notes: 'Vegetarian options needed',
      language: 'en',
      status: ReservationStatus.CONFIRMED,
    },
    {
      confirmationCode: 'BEL-E7W3Q',
      date: new Date('2026-03-09'),
      time: '18:30',
      guests: 4,
      name: 'François Dubois',
      email: 'f.dubois@example.com',
      phone: '+41 79 888 77 66',
      notes: null,
      language: 'fr',
      status: ReservationStatus.PENDING,
    },
    {
      confirmationCode: 'BEL-F1Z9V',
      date: new Date('2026-03-10'),
      time: '20:00',
      guests: 2,
      name: 'Hans Müller',
      email: 'hans.m@example.com',
      phone: '+41 78 666 55 44',
      notes: 'Gluten-free diet',
      language: 'de',
      status: ReservationStatus.CONFIRMED,
    },
    {
      confirmationCode: 'BEL-G6H4X',
      date: new Date('2026-03-10'),
      time: '19:30',
      guests: 5,
      name: 'Giuseppe Bianchi',
      email: 'giuseppe.b@example.com',
      phone: '+41 77 333 22 11',
      notes: 'Business dinner',
      language: 'it',
      status: ReservationStatus.PENDING,
    },
    {
      confirmationCode: 'BEL-H2J8Y',
      date: new Date('2026-03-11'),
      time: '12:00',
      guests: 4,
      name: 'Elena Kowalski',
      email: 'elena.k@example.com',
      phone: '+41 79 444 33 22',
      notes: null,
      language: 'en',
      status: ReservationStatus.CANCELLED,
    },
    {
      confirmationCode: 'BEL-I9K5U',
      date: new Date('2026-03-12'),
      time: '18:00',
      guests: 3,
      name: 'Lars Jensen',
      email: 'lars.j@example.com',
      phone: '+41 76 222 11 00',
      notes: 'Anniversary',
      language: 'en',
      status: ReservationStatus.PENDING,
    },
    {
      confirmationCode: 'BEL-J3L7S',
      date: new Date('2026-03-12'),
      time: '20:30',
      guests: 2,
      name: 'Anna Berg',
      email: 'anna.b@example.com',
      phone: '+41 78 999 88 77',
      notes: 'Window table if possible',
      language: 'de',
      status: ReservationStatus.CONFIRMED,
    },
    {
      confirmationCode: 'BEL-K8M4R',
      date: new Date('2026-03-13'),
      time: '19:00',
      guests: 8,
      name: 'Marco Ferrari',
      email: 'marco.f@example.com',
      phone: '+41 79 777 66 55',
      notes: 'Family gathering',
      language: 'it',
      status: ReservationStatus.COMPLETED,
    },
    {
      confirmationCode: 'BEL-L5N9T',
      date: new Date('2026-03-13'),
      time: '13:00',
      guests: 4,
      name: 'Sophie Martin',
      email: 'sophie.m@example.com',
      phone: '+41 77 555 44 33',
      notes: 'Late lunch meeting',
      language: 'fr',
      status: ReservationStatus.PENDING,
    },
  ]

  for (const r of reservations) {
    await prisma.reservation.create({ data: r })
  }

  console.log(`✅ Created ${reservations.length} reservations`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
