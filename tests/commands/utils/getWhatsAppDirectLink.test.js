const { describe, it, mock } = require('node:test');
const assert = require('node:assert');
const getWhatsAppDirectLink = require('../../../commands/utils/getWhatsAppDirectLink');

describe('getWhatsAppDirectLink', () => {
    it('should generate WhatsApp link with correct phone number', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const match = ['full match', '11999887766'];
        const chatId = 12345;

        getWhatsAppDirectLink.execute(match, chatId, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[0], chatId);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[1], 'https://api.whatsapp.com/send?phone=5511999887766');
    });

    it('should trim whitespace from phone number', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const match = ['full match', '  11999887766  '];
        const chatId = 12345;

        getWhatsAppDirectLink.execute(match, chatId, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[1], 'https://api.whatsapp.com/send?phone=5511999887766');
    });

    it('should handle empty phone number', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const match = ['full match', ''];
        const chatId = 12345;

        getWhatsAppDirectLink.execute(match, chatId, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[1], 'https://api.whatsapp.com/send?phone=55');
    });
});
