import { NextRequest } from "next/server"

describe('GetAuthUser()', () => {
    it("should return the expected data",async () => {
        const mockResult = {
            sub: 1,
            email: 'email-test',
            name: 'name-test',
        }

        jest.mock('next-auth/jwt', () => ({
            getToken: jest.fn().mockResolvedValue(mockResult)
        }))

        const req = {} as NextRequest

        const { getAuthUser } = await import('../utils/getAuthUser');

        const result = await getAuthUser(req)

        expect(result).toEqual({
            id: 1,
            email: 'email-test',
            name: 'name-test',
        })
    })
})