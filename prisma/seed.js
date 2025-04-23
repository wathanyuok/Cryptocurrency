import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.externalTransfer.deleteMany();
  await prisma.walletCurrency.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.user.deleteMany();
  await prisma.currency.deleteMany();

  const thb = await prisma.currency.create({
    data: { code: 'THB', type: 'fiat', currentPrice: 1.0 }
  });
  const usd = await prisma.currency.create({
    data: { code: 'USD', type: 'fiat', currentPrice: 33.0 }
  });
  const btc = await prisma.currency.create({
    data: { code: 'BTC', type: 'crypto', currentPrice: 1200000.0 }
  });
  const eth = await prisma.currency.create({
    data: { code: 'ETH', type: 'crypto', currentPrice: 70000.0 }
  });

  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123',
      status: 'verified'
    }
  });
  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      email: 'user2@example.com',
      password: 'password123',
      status: 'verified'
    }
  });

  const wallet1 = await prisma.wallet.create({ data: { userId: user1.id } });
  const wallet2 = await prisma.wallet.create({ data: { userId: user2.id } });

  await prisma.walletCurrency.createMany({
    data: [
      { walletId: wallet1.id, currencyId: thb.id, balance: 100000.0 },
      { walletId: wallet1.id, currencyId: btc.id, balance: 0.5 },
      { walletId: wallet2.id, currencyId: usd.id, balance: 5000.0 },
      { walletId: wallet2.id, currencyId: eth.id, balance: 5.0 }
    ]
  });

  const [order1, order2] = await prisma.$transaction([
    prisma.order.create({
      data: {
        userId: user1.id,
        currencyPair: 'ETH/THB',
        orderType: 'buy',
        price: 65000.0,
        quantity: 1.0,
        status: 'open'
      }
    }),
    prisma.order.create({
      data: {
        userId: user2.id,
        currencyPair: 'ETH/THB',
        orderType: 'sell',
        price: 75000.0,
        quantity: 1.0,
        status: 'open'
      }
    })
  ]);

  await prisma.transaction.create({
    data: {
      senderWalletId: wallet1.id,
      receiverWalletId: wallet2.id,
      currencyId: btc.id,
      amount: 0.1,
      txnType: 'internal',
      status: 'completed'
    }
  });

  console.log('Seeding completed successfully');
}

main()
  .catch(e => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
