const amqp = require('amqplib');
const amqp_connect_docker = 'amqp://localhost:5672';

const sendQueue = async ({ msg }) => {
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
        await channel.sendToQueue(queueName, Buffer.from(msg), {
            persistent: true    // save to cache or disk
        });
        // await channel.sendToQueue(queueName, Buffer.from(msg), {
        //     expiration: '10000' // TTL Time to life
        // });
        // close connection
    } catch (error) {
        console.log('Error::', error.message);
    }
}
const msg = process.argv.slice(2).join(' ') || 'hello';
//bin.node
//path
sendQueue({ msg });