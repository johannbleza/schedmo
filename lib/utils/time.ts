export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const timeToMeridiem = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);

  if (hours > 12) {
    return `${hours - 12}:${String(minutes).padStart(2, "0")} PM`;
  }
  return `${hours}:${String(minutes).padStart(2, "0")} ${hours == 12 ? "PM" : "AM"}`;
};
