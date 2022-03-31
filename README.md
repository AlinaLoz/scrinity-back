## Чтобы обновить сервер нужно
- сбилдить docker image
- запаблишить в aws service registry

### Микросервисы
- api 

### Чтобы запушить api сервис в registry
```
yarn publish:api:image
```

### Создание beanstalk
```
eb init --r eu-west-1 // инит
eb create --single --r eu-west-1 // создание+деплой
```

### Деплой на сервер делать из master/develop веток.
### Запуск локально beanstalk сборки
```
eb local run
```

### Деплой все апы согласно Dockerrun.aws.json
```
yarn deploy
```

На сервере aws запускается не docker-compose.yml, а 
Dockerrun.aws.json. Генерация Dockerrun.aws.json на основе docker-compose.yaml
```
docker run --rm -v $(pwd):/data/ micahhausler/container-transform  docker-compose.yml
```

### Полезные ресуры 
https://coderwall.com/p/e7gzbq/https-with-certbot-for-nginx-on-amazon-linux  
https://serverfault.com/questions/1078775/install-certbot-nginx-in-amazon-linux-ami  
https://www.cyberciti.biz/faq/amazon-linux-ami-install-linux-nginx-mysql-php-lemp/  

### Настройка nginx+ssl на Amazon Linux
```
pip install virtualenv
virtualenv ~/.certbot
source ~/.certbot/bin/activate
pip install 'setuptools<41'
pip install certbot
pip install 'parsedatetime<2.6'
sudo yum install nginx -y

cd /etc/nginx/
cp nginx.conf nginx.conf.org
yum install nano
    nano nginx.conf
mkdir /var/www/html
sudo ~/.certbot/bin/certbot  certonly -d scrinity.by -d www.scrinity.by
sudo ~/.certbot/bin/certbot  certonly -d cabinet.scrinity.by -d www.cabinet.scrinity.by
//add aws securyty group with open 443 port
sudo service nginx start
sudo service nginx stop

scp ./docker/nginx/index.html   scrinity:/var/www/html
scp ./docker/nginx/nginx.conf  scrinity:/home/ec2-user/
scp ./docker/nginx/nginx.conf scrinity:/etc/nginx/
mv nginx.conf /etc/nginx/
scp  ec2-user@99.81.215.180:/etc/nginx/nginx.conf  ~
```

Чтобы собрать локально докер
```
docker build -f ./docker/api/Dockerfile -t  project-z:latest .
docker run -e SERVICE=manager -it project-z:latest 
docker run -e SERVICE=api -it project-z:latest 
```

```
git remote -v
git push codecommit-origin -f
 ```

Развернуть сервер на ruvds
```
chown -R lozita /usr/
sudo apt-get update && sudo apt-get upgrade
nvm install --lts
https://pm2.keymetrics.io/docs/usage/quick-start/
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-ru
https://phoenixnap.com/kb/install-docker-on-ubuntu-20-04
sudo chown $USER /var/run/docker.sock

pm2 start npm --name "back" -- deploy:start
pm2 start npm --name "client" -- start
pm2 start npm --name "admin" -- start

https://github.com/actions/checkout/issues/211
server_name  scrinity.by www.scrinity.by cabinet.scrinity.by www.cabinet.scrinity.by;
https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04-ru
```
