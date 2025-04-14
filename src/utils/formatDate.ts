export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
  
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}