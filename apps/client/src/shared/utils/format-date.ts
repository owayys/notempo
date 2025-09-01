export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${Math.max(0, diffInSeconds)}s`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y`;
};

export const getMonthPretty = (date: Date): string => {
  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  if (dateYear === currentYear) {
    return date.toLocaleString("default", { month: "short" });
  } else {
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  }
};
