const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

describe('isValidEmail', () => {
    test('有効なメールアドレスはtrueを返す', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
    });

    test('無効なメールアドレスはfalseを返す', () => {
        expect(isValidEmail('invalid-email')).toBe(false);
        expect(isValidEmail('')).toBe(false);
    });
});
