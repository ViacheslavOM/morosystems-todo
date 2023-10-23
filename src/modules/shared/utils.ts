export const formattedDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
}