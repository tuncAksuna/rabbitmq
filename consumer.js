/**
 * @author tunCode
 * @description : These code lines consumes message from the publisher 
 * to start consumers by queue name : npm run consumer queue1 or queue2
 */

const amqp = require("amqplib");
const message = {
    description: "This is a test message",
}

const queueName = process.argv[2] || "jobsQueue"

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName)

        // receive the message
        console.log("Waiting for the message ...");
        // when the message come from publisher to queue: 
        channel.consume(queueName, mess => {
            console.log(queueName, mess.content.toString())
            channel.ack(mess);
        });


    } catch (error) {
        console.log("Error", error)
    }
}