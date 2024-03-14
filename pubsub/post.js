const amqp = require('amqplib');
const amqp_connect_docker = 'amqp://localhost:5672';

const postVideo = async ({ msg }) => {
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
        await channel.publish(exchangelName, '', Buffer.from(msg));

        console.log(`SEND:::: OK ${msg}`)

        setTimeout(() => {
            conn.close();
            process.exit(0);
        })
    } catch (error) {
        console.log('Error::', error.message);
    }
}
postVideo({ msg: 'New* video in Youtube channel!' });