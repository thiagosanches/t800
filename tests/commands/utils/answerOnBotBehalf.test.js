const { describe, it, mock } = require('node:test');
const assert = require('node:assert');
const answerOnBotBehalf = require('../../../commands/utils/answerOnBotBehalf');

describe('answerOnBotBehalf', () => {
    it('should send message to correct chat with correct text', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const json = {};
        const msg = {};
        const match = ['full match', '12345:Hello World'];

        answerOnBotBehalf.execute(json, msg, match, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[0], '12345');
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[1], 'Hello World');
    });

    it('should handle message with multiple colons', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const json = {};
        const msg = {};
        const match = ['full match', '12345:Hello:World:Test'];

        answerOnBotBehalf.execute(json, msg, match, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[0], '12345');
        // split() returns first element as chatId, join rest as message
        // So "12345:Hello:World:Test".split(':') = ['12345', 'Hello', 'World', 'Test']
        // message[0] = '12345', message[1] = 'Hello'
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[1], 'Hello');
    });

    it('should handle empty message', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const json = {};
        const msg = {};
        const match = ['full match', '12345:'];

        answerOnBotBehalf.execute(json, msg, match, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[0], '12345');
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[1], '');
    });
});
