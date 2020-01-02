const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply("Welcome!"));
bot.command(
  "long",
  ctx =>
    new Promise(resolve =>
      setTimeout(() => {
        ctx.reply("Is it an issue?").then(resolve);
      }, 5000)
    )
);

const handleShutdown = async signal => {
  console.log("Received signal:", signal);

  await bot.stop(() => process.exit(0)).catch(e => process.exit(1));
};

bot.launch().then(() => {
  ["SIGTERM", "SIGINT"].forEach(s => process.on(s, handleShutdown));
});
