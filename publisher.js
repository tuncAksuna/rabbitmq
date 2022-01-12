/**
 * @author tunCode
 * @description : These code lines publishes message to Queue
 * to start publisher : npm run publisher queue1
 */

const amqp = require("amqplib");
const message = {
    description: "This is a test message",
}

const queueName = process.argv[2] || "jobsQueue"
console.log(queueName)

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName)

        setInterval(() => {
            message.description = new Date().getTime();
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log("Sent message", message);
        }, 100)

    } catch (error) {
        console.log("Error", error)
    }
}