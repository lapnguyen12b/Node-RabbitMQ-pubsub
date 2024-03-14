const amqp = require('amqplib');
const amqp_connect_docker = 'amqp://localhost:5672';

const reveiveNoti = async () => {
    try {
        // create Connect
        const conn = await amqp.connect(amqp_connect_docker);
        // create channel
        const channel = await conn.createChannel();
        // create Queue name
        const exchangelName = 'post_video';
        // durable false => server shutdown => remove data
        await channel.assertExchange(exchangelName, 'fanout', {
            durable: true
        })

        // publish
        const { queue } = await channel.assertQueue('', {
            exclusive: true
        });
        console.log(`name queue: ${queue}`)

        await channel.bindQueue(queue, exchangelName, '');

        await channel.consume(queue, msg => {
            console.log(`MSG: ${msg.content.toString()}`)
        }, {
            noAck: true
        })
    } catch (error) {
        console.log('Error::', error.message);
    }
}
reveiveNoti();