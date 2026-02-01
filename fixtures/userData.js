export const userData = {
    validUser: {
        email: 'testuser@example.com',
        password: 'Test@123',
    },
    invalidUser: {
        email: 'invalid@example.com',
        password: 'wrongpassword',
    },
    newUser: {
        name: 'Test User',
        email: `testuser${Date.now()}@example.com`,
        password: 'NewUser@123',
        title: 'Mr',
        day: '15',
        month: '6',
        year: '1990',
        firstName: 'Test',
        lastName: 'User',
        company: 'Test Company',
        address: '123 Test Street',
        address2: 'Apt 4B',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90001',
        mobileNumber: '1234567890',
    },
};
