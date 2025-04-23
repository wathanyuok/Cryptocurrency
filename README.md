# Step1
-- bash
git clone https://github.com/wathanyuok/Cryptocurrency.git .
npm init -y
npm install
npx prisma init
--
## Step 2 .env
ใส่รหัส db ตรง xxxx ในไฟล์.env: DATABASE_URL="mysql://root:xxxx@localhost:3306/crypedb"
--
## Step 3 Prisma
npx prisma db push
# or
npx prisma migrate dev --name init
npx prisma db seed
---
## Step 4 npm start
npm start
---
image structure ![alt text](image.png)


