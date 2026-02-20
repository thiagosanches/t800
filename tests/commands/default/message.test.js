const { describe, it, mock } = require('node:test');
const assert = require('node:assert');
const message = require('../../../commands/default/message');

describe('message', () => {
    it('should forward message to iot group when user is not admin', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const json = {
            config: {
                adminUsers: [111, 222],
                iotGroup: 999
            }
        };
        const msg = {
            from: {
                id: 333,
                first_name: 'John'
            },
            text: 'Hello from user'
        };

        message.execute(msg, json, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
        assert.strictEqual(mockBot.sendMessage.mock.calls[0].arguments[0], 999);
        assert.ok(mockBot.sendMessage.mock.calls[0].arguments[1].includes('[333]'));
        assert.ok(mockBot.sendMessage.mock.calls[0].arguments[1].includes('John'));
        assert.ok(mockBot.sendMessage.mock.calls[0].arguments[1].includes('Hello from user'));
        assert.deepStrictEqual(mockBot.sendMessage.mock.calls[0].arguments[2], { parse_mode: 'markdown' });
    });

    it('should not forward message when user is admin', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const json = {
            config: {
                adminUsers: [111, 222],
                iotGroup: 999
            }
        };
        const msg = {
            from: {
                id: 111,
                first_name: 'Admin'
            },
            text: 'Hello from admin'
        };

        message.execute(msg, json, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 0);
    });

    it('should handle message with special markdown characters', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const json = {
            config: {
                adminUsers: [],
                iotGroup: 999
            }
        };
        const msg = {
            from: {
                id: 333,
                first_name: 'John'
            },
            text: 'Test *bold* _italic_ `code`'
        };

        message.execute(msg, json, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
        assert.ok(mockBot.sendMessage.mock.calls[0].arguments[1].includes('Test *bold* _italic_ `code`'));
    });

    it('should handle empty admin users array', () => {
        const mockBot = {
            sendMessage: mock.fn()
        };
        const json = {
            config: {
                adminUsers: [],
                iotGroup: 999
            }
        };
        const msg = {
            from: {
                id: 333,
                first_name: 'John'
            },
            text: 'Hello'
        };

        message.execute(msg, json, mockBot);

        assert.strictEqual(mockBot.sendMessage.mock.calls.length, 1);
    });
});
