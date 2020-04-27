﻿using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Models.EvemtMessages;

using System;

using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types.Enums;

namespace TelegramMessenger
{
    class Program
    {
        private static readonly string token = "1152281063:AAFJyTDTMn2eXZk_YMYFUYRrrv46QB7HU9s";

        private static readonly TelegramBotClient bot = new TelegramBotClient(token);

        static void Main(string[] args)
        {
           using EventReceivingService eventReceivingService = new EventReceivingService(null);

            Console.WriteLine("Hello World!");

            bot.OnMessage += Bot_OnMessage;

           // bot.SendTextMessageAsync(-473998265, "BotStarted!");

            bot.StartReceiving();

            eventReceivingService.Run<EmergencyMessage>((message) => bot.SendTextMessageAsync(1232, message.Address));
            
            Console.ReadLine();

            bot.StopReceiving();
        }

        private static void Bot_OnMessage(object? sender, MessageEventArgs e)
        {
            if (e.Message.Type == MessageType.Text)
            {
                bot.SendTextMessageAsync(e.Message.Chat.Id, "Hello World!");

                //bot.SendTextMessageAsync(-473998265, $"{e.Message.From.Username} sended: {e.Message.Text}");

            }
        }
    }
}
