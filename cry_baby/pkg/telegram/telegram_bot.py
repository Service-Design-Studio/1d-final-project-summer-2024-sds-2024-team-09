import asyncio
from telegram import Bot
from telegram.error import TelegramError

async def send_message(bot, chat_id, text):
    try:
        await bot.send_message(chat_id=chat_id, text=text)
        print("Message sent successfully")
    except TelegramError as e:
        print(f"Failed to send message: {e}")


    