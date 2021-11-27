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
sudo ~/.certbot/bin/certbot  certonly -d dev.lozita.click -d www.dev.lozita.click
//add aws securyty group with open 443 port
sudo service nginx start
sudo service nginx stop

scp ./docker/nginx/nginx.conf  ec2-user@99.81.215.180:/home/ec2-user/
scp ./docker/nginx/nginx.conf  ec2-user@99.81.215.180:/etc/nginx/
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
