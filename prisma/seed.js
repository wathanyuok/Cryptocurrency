import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // สร้างสกุลเงิน
  const currencies = await Promise.all([
    prisma.currency.upsert({
      where: { code: 'THB' },
      update: {},
      create: { code: 'THB', type: 'fiat', currentPrice: 1.0 }
    }),
    prisma.currency.upsert({
      where: { code: 'USD' },
      update: {},
      create: { code: 'USD', type: 'fiat', currentPrice: 33.0 }
    }),
    prisma.currency.upsert({
      where: { code: 'BTC' },
      update: {},
      create: { code: 'BTC', type: 'crypto', currentPrice: 1200000.0 }
    }),
    prisma.currency.upsert({
      where: { code: 'ETH' },
      update: {},
      create: { code: 'ETH', type: 'crypto', currentPrice: 70000.0 }
    })
  ])

  // สร้างผู้ใช้
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'user1@example.com' },
      update: {},
      create: {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        status: 'verified'
      }
    }),
    prisma.user.upsert({
      where: { email: 'user2@example.com' },
      update: {},
      create: {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        status: 'verified'
      }
    })
  ])

  // สร้างกระเป๋าเงิน
  const wallets = await Promise.all(
    users.map(user => 
      prisma.wallet.create({ data: { userId: user.id } })
    )
  )

  // เพิ่มเงินในกระเป๋า
  await Promise.all([
    prisma.walletCurrency.create({
      data: {
        walletId: wallets[0].id,
        currencyId: currencies[0].id, // THB
        balance: 100000.0
      }
    }),
    prisma.walletCurrency.create({
      data: {
        walletId: wallets[0].id,
        currencyId: currencies[2].id, // BTC
        balance: 0.5
      }
    }),
    prisma.walletCurrency.create({
      data: {
        walletId: wallets[1].id,
        currencyId: currencies[1].id, // USD
        balance: 5000.0
      }
    }),
    prisma.walletCurrency.create({
      data: {
        walletId: wallets[1].id,
        currencyId: currencies[3].id, // ETH
        balance: 5.0
      }
    })
  ])

  // สร้างคำสั่งซื้อ
  await prisma.order.createMany({
    data: [
      {
        userId: users[0].id,
        currencyPair: 'ETH/THB',
        orderType: 'buy',
        price: 65000.0,
        quantity: 1.0,
        status: 'open'
      },
      {
        userId: users[1].id,
        currencyPair: 'ETH/THB',
        orderType: 'sell',
        price: 75000.0,
        quantity: 1.0,
        status: 'open'
      }
    ]
  })

  // สร้างธุรกรรม
  await prisma.transaction.create({
    data: {
      senderWalletId: wallets[0].id,
      receiverWalletId: wallets[1].id,
      currencyId: currencies[2].id, // BTC
      amount: 0.1,
      txnType: 'internal',
      status: 'completed'
    }
  })

  console.log('✅ Seeding completed successfully')
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
