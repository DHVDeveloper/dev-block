export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }
    
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}