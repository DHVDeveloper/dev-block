import { formatDate } from "@/utils/formatDate"


describe("formatDate()", () => {
    it('should return truthy value', () => {
        const formattedDate = formatDate("2025-11-15T10:30:00.000Z")
        expect(formattedDate).toBeTruthy()
    })
    it('should return the date formatted', () => {
        const formattedDate = formatDate("2025-11-15T10:30:00.000Z")
        expect(formattedDate).toBe('Nov 15, 2025')
    })

    it('Should throw error',() => {
        expect(() => formatDate("fecha-mal")).toThrow();
    })
})