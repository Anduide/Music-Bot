const client = require('../index').client
const { readdirSync } = require('fs')

readdirSync('./events').forEach(eventName => require('../events/'+eventName))

readdirSync('./commands').forEach(category =>{
    readdirSync(`./commands/${category}`).forEach(cmdName => {
        client.commands.set(cmdName.split(".")[0], require('../commands/' + category + "/" + cmdName))
    })
});

setTimeout(()=>{
client.application.commands.set(client.commands);

}, 3000)