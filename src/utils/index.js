export const generateHourOptions = (startHour = 8, endHour = 22) =>
  Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return {
      value: hour,
      option: `${hour < 10 ? "0" : ""}${hour}:00`,
    };
  });
