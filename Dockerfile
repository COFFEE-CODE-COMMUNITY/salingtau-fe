FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV VITE_API_URL=https://api.salingtau.cthree.it.com/api/v1
ENV VITE_IMAGE_BASE_URL=https://api.salingtau.cthree.it.com/api/v1/files/
ENV VITE_VIDEO_BASE_URL=https://api.salingtau.cthree.it.com/api/v1/files/
RUN npm run build

FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]