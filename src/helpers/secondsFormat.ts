export function formatDurationToHours(duration: string) {
  const totalSeconds = Number(duration);
  if (isNaN(totalSeconds)) return duration;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
