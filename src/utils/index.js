export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (remainingDays < 0) return "Finished";
  return remainingDays === 0 ? "Last Day" : `${remainingDays} Days Left`;
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage > 100 ? 100 : percentage;
};