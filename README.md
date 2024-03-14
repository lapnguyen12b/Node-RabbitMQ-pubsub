# RabbitMQ-Message-Queueing-Pub/Sub
producer > Exchange > Queue


Exchange > bind > Queue
## install , Running the services
```bash
$ npm install
```

```bash
$ node post.js
```
```bash
$ node receiveNoti.js
```

## RabbitMQ server
### Docker
```bash
$ docker run -d -hostname rmg --name rabbit-server -p 15672:15672 -p 5672:5672 rabbitmg:3-management
```
http://localhost:15672
guest/guest
