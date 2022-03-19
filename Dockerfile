# FROM 指令告訴 Docker 使用哪個映像檔作為基底 ex: ubuntu:latest
# Choose the Image which has Node installed already
FROM node:alpine
# COPY all the files from Current Directory into the Container
COPY ./ ./
# RUN開頭的指令會在建立中執行，比如安裝一個套件，在這裏使用 apt-get 來安裝了一些套件
# Install the Project Dependencies like Express Framework
RUN npm install
# expose httpd port
EXPOSE 3000
# the command to run
# Default Command to launch the Application
CMD ["npm", "start"]