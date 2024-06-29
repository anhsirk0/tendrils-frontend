import { format, isToday, isYesterday } from "date-fns";

function toDateStr(date: Date | number) {
  let fmt = "hh:mm aa, dd-MM-yyyy";
  if (isToday(date)) fmt = "hh:mm aa'";
  if (isYesterday(date)) fmt = "hh:mm aa 'Yesterday'";
  return format(date, fmt);
}

export default toDateStr;
