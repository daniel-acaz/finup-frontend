FROM node:24.0.1 as build

WORKDIR /finup-frontend

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24.0.1

WORKDIR /finup-frontend

COPY --from=build /finup-frontend/package*.json ./
COPY --from=build /finup-frontend/node_modules ./node_modules
COPY --from=build /finup-frontend/build ./build

EXPOSE 3000

CMD ["npx", "react-router-serve", "./build/server/index.js"]