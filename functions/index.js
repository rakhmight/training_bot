const { Telegraf, Markup } = require('telegraf');
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
require("dotenv/config");

const bot = new Telegraf(process.env.TELEGRAM_BOT_API);

bot.start(ctx => ctx.reply(
  '👋 Добро пожаловать в наш клуб по Кикбоксу и Муай Тай!',
  Markup.keyboard([
    ['📅 Расписание', '💰 Цены'],
    ['📝 Записаться']
  ]).resize()
));

bot.hears('📅 Расписание', ctx => ctx.replyWithHTML(`
📅 <b>Расписание тренировок:</b>

🥊 <b>Кикбокс / Муай Тай</b>

📍 <b>Понедельник, Среда, Пятница</b>
🏢 Адрес: Карасув-2, Мингбулок кучаси (ориентир Unicon.uz)
🔸 18:30 - 20:20 (Маленькая группа)
🔸 20:20 - 22:00 (Взрослая группа)

📍 <b>Вторник, Четверг, Суббота</b>
🏢 Адрес: улица Махтумкули, Лакус зал
🔸 16:00 - 17:30 (Маленькая группа)
`));

bot.hears('💰 Цены', ctx => ctx.replyWithHTML(`
💰 <b>Цены на тренировки:</b>

🔹 Карасув-2 (Мингбулок кучаси):
• Маленькая группа: 400.000 сум/месяц
• Взрослая группа: 500.000 сум/месяц

🔹 Улица Махтумкули (Лакус зал):
• Маленькая группа: 450.000 сум/месяц
`));

bot.hears('📝 Записаться', ctx => ctx.reply('✏️ Для записи отправьте сообщение в формате:\n\nФИО, Возраст, Адрес зала, Дни и Время группы.\n\nМенеджер свяжется с вами для подтверждения.'));

bot.on('text', ctx => {
  const request = ctx.message.text;
  const username = ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name;

  ctx.reply('✅ Ваша заявка принята, менеджер скоро свяжется с вами!');

  // отправка заявки менеджеру
  bot.telegram.sendMessage(process.env.ADMIN_CHAT_ID, `📩 <b>Новая заявка на тренировку:</b>\n\n👤 От: ${username}\n📝 Запрос: ${request}`, {parse_mode: 'HTML'});
});

bot.launch().then(() => console.log('Bot started'));

// exports.trainingBot = onRequest((request, response) => {
//     logger.info("Incoming message", request.body);
    
//     return bot.handleUpdate(request.body, response).then((rv) => {
//         return !rv && response.sendStatus(200);
//     });
// })

