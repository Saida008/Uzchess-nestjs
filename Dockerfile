FROM node:25-alpine

WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

CMD ["node", "dist/main.js"]

COPY --from=build /app/dist ./dist
RUN npm install --excludeDev=true

CMD ["node", "dist/main.js"]