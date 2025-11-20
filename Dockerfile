# --------------------------
# 1) BUILD STAGE (Node)
# --------------------------
FROM node:20-alpine AS build

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les deps
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier tout le code source Angular
COPY . .

# Build Angular (production)
RUN npm run build -- --configuration production

# --------------------------
# 2) RUN STAGE (Nginx)
# --------------------------
FROM nginx:alpine

# Copier ton build Angular vers Nginx
COPY --from=build /app/dist/my-shop/browser /usr/share/nginx/html

# Supprimer config par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Ajouter ton fichier Nginx (pour SPA Angular)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
