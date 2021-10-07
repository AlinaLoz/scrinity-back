in order to push to aws registry
```
yarn publish:image
```

in order to create eb
```
eb create --single
```

in order to run eb locally
```
eb local run
```

in order ro docker deploy to registry
```
yarn deploy
```

in order to eb deploy
```
eb:deploy
```

полезный репо=https://github.com/cloudxlab/user-wishlist-app/blob/main/Dockerrun.aws.json
```
eb local run
docker run --rm -v $(pwd):/data/ micahhausler/container-transform  docker-compose.yml
```

ssh connect
```
eb ssh debelop
INFO: Running ssh -i /home/lozita/.ssh/lozita ec2-user@63.34.40.111
```

