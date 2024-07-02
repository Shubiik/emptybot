module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.username} is logged in and online!`);
    }
}