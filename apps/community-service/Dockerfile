FROM node:18-alpine

WORKDIR /usr/src/app

# Faqat package.json va yarn.lock ni ko'chirish bilan dependencies ni o'rnatamiz
# Bu image build qilishda keshdan foydalanishni optimallashtiradi
COPY package.json yarn.lock* ./
RUN yarn install

# Dastur kodini ko'chirish
COPY . .

# TypeScript kodini kompilyatsiya qilish
RUN yarn build

# Ishga tushirish porti
EXPOSE 3000

# Dasturni ishga tushirish
CMD ["yarn", "start:prod"]
