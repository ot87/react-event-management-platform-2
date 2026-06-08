export function toISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function matchesDate(eventDate: string, dateFilter: string): boolean {
  if (!dateFilter) {
    return true;
  }

  const today = new Date();
  const todayISO = toISO(today);

  switch (dateFilter) {
    case "upcoming":
      return eventDate >= todayISO;
    case "thisWeek": {
      const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
      const weekEnd = new Date(today);

      weekEnd.setDate(weekEnd.getDate() + daysUntilSaturday);

      return eventDate >= todayISO && eventDate <= toISO(weekEnd);
    }
    case "thisMonth": {
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return eventDate >= todayISO && eventDate <= toISO(monthEnd);
    }
    default:
      return true;
  }
}
