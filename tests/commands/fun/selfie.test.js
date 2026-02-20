const { describe, it, mock } = require('node:test');
const assert = require('node:assert');
const selfie = require('../../../commands/fun/selfie');

describe('selfie', () => {
    it('should send a random photo from the selfies array', () => {
        const mockBot = {
            sendPhoto: mock.fn()
        };
        const json = {
            config: {
                selfies: [
                    'photo1.jpg',
                    'photo2.jpg',
                    'photo3.jpg'
                ]
            }
        };
        const chatId = 12345;

        // Mock Math.random to return a predictable value
        const originalRandom = Math.random;
        Math.random = () => 0.5;

        selfie.execute(json, chatId, mockBot);

        assert.strictEqual(mockBot.sendPhoto.mock.calls.length, 1);
        assert.strictEqual(mockBot.sendPhoto.mock.calls[0].arguments[0], chatId);
        // Should send one of the photos from the array
        const sentPhoto = mockBot.sendPhoto.mock.calls[0].arguments[1];
        assert.ok(json.config.selfies.includes(sentPhoto));

        // Restore Math.random
        Math.random = originalRandom;
    });

    it('should handle edge case when random index equals array length', () => {
        const mockBot = {
            sendPhoto: mock.fn()
        };
        const json = {
            config: {
                selfies: [
                    'photo1.jpg',
                    'photo2.jpg'
                ]
            }
        };
        const chatId = 12345;

        // Mock Math.random to return a value that would round to array length
        const originalRandom = Math.random;
        Math.random = () => 0.99;

        selfie.execute(json, chatId, mockBot);

        // Should not crash and should not send a photo if index >= length
        // Based on the code, if index < length, it sends
        if (mockBot.sendPhoto.mock.calls.length > 0) {
            const sentPhoto = mockBot.sendPhoto.mock.calls[0].arguments[1];
            assert.ok(json.config.selfies.includes(sentPhoto));
        }

        // Restore Math.random
        Math.random = originalRandom;
    });

    it('should not send photo when selfies array is empty', () => {
        const mockBot = {
            sendPhoto: mock.fn()
        };
        const json = {
            config: {
                selfies: []
            }
        };
        const chatId = 12345;

        selfie.execute(json, chatId, mockBot);

        assert.strictEqual(mockBot.sendPhoto.mock.calls.length, 0);
    });
});
