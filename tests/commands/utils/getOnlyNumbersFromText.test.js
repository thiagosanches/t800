const { describe, it, mock } = require('node:test');
const assert = require('node:assert');
const getOnlyNumbersFromText = require('../../../commands/utils/getOnlyNumbersFromText');

describe('getOnlyNumbersFromText', () => {
    it('should extract numbers from text with special characters', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const msg = {
            text: 'Call me at 123-456-7890 or 999'
        };
        const chatId = 12345;

        getOnlyNumbersFromText.execute(msg, chatId, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 2);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[0], chatId);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[1], '1234567890');
        assert.strictEqual(mockBot.sendMessage.mock.calls[1].arguments[0], chatId);
        assert.strictEqual(mockBot.sendMessage.mock.calls[1].arguments[1], '999');
    });

    it('should handle text with no numbers', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const msg = {
            text: 'Hello world!'
        };
        const chatId = 12345;

        getOnlyNumbersFromText.execute(msg, chatId, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 0);
    });

    it('should handle text with multiple number groups', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const msg = {
            text: 'Numbers: 111, 222, and 333'
        };
        const chatId = 12345;

        getOnlyNumbersFromText.execute(msg, chatId, mockBot);

        // After removing special chars: "Numbers111222and333"
        // match(/([0-9])+/g) will find consecutive digit groups
        // which results in ["111", "222", "333"] if separated, or ["111222333"] if consecutive
        // The actual behavior: replace removes special chars, then match finds digit groups
        // "Numbers: 111, 222, and 333" -> "Numbers111222and333" -> matches: ["111222", "333"]
        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 2);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[1], '111222');
        assert.strictEqual(mockBot.sendMessage.mock.calls[1].arguments[1], '333');
    });
});
