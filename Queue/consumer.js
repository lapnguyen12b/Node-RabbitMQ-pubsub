const amqp = require('amqplib');
const amqp_connect_docker = 'amqp://localhost:5672';

const receivceQueue = async () => {
    try {
        // create Connect
        const conn = await amqp.connect(amqp_connect_docker);
        // create channel
        const channel = await conn.createChannel();
        // create Queue name
        const queueName = 'Queue_1';
        // durable false => server shutdown => remove data
        await channel.assertQueue(queueName, {
            durable: true
        })
        // send to Queue
        await channel.consume(queueName, msg => {
            console.log('Msg::', msg.content.toString());
        }, {
            noAck: true // true confirm received, remove queue
        })
        // close connection
    } catch (error) {
        console.log('Error::', error.message);
    }
}

receivceQueue();
