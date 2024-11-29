const useDate = (date: string | undefined): string => {
  if (!date) {
    return "Invalid Date"; 
  }

  const fullDate: Date = new Date(date);
  const year: number = fullDate.getFullYear();
  const monthIndex: number = fullDate.getMonth();
  const day: number = fullDate.getDate();

  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName: string = months[monthIndex];

  const dateFormated: string =
    day.toString().padStart(2, "0") + "-" + monthName + "-" + year;

  return dateFormated;
};

export default useDate;
