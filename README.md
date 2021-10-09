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
eb init --regin eu-west-1 // инит
eb create --single --regin eu-west-1 // создание+деплой
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

### управление nginx внутри amazon linux 
```
sudo service nginx start
sudo service nginx stop
```

### Полезные ресуры
https://github.com/cloudxlab/user-wishlist-app/blob/main/Dockerrun.aws.json
https://coderwall.com/p/e7gzbq/https-with-certbot-for-nginx-on-amazon-linux
https://serverfault.com/questions/1078775/install-certbot-nginx-in-amazon-linux-ami
https://www.cyberciti.biz/faq/amazon-linux-ami-install-linux-nginx-mysql-php-lemp/
