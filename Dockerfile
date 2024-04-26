# Dockerfile para front-end
# Define a imagem base que inclui um servidor web, como o Nginx, para servir os arquivos estáticos
FROM nginx:alpine

# Remove os arquivos de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/share/nginx/html

# Copia os arquivos do seu projeto para o diretório de trabalho
COPY . .

# O servidor web Nginx já estará configurado para servir os arquivos estáticos da pasta especificada

# Nenhum comando CMD ou ENTRYPOINT é necessário, pois o contêiner Nginx já iniciará o servidor web automaticamente
