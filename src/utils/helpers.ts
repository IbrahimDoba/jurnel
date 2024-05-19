import moment from "moment";
import { journalType } from "../../types";

export const getNextOrPreviousDay = (
  dateString: string,
  operation: "next" | "previous"
) => {
  const date = moment(dateString, "YYYY-MM-DD");
  const newDate =
    operation === "next" ? date.add(1, "days") : date.subtract(1, "days");
  console.log("NEW DATE: ", newDate.format("YYYY-MM-DD"));
  return newDate.format("YYYY-MM-DD");
};

export const sortJournalsByDate = (journals: journalType[]) => {
  const sortedItems = journals.sort((j1, j2) => {
    const date1 = moment(j1.dateCreated, "YYYY-MM-DD");
    const date2 = moment(j2.dateCreated, "YYYY-MM-DD");

    // Sort in descending order (most recent first)
    return date2.diff(date1);
  });
  return sortedItems;
};

export const checkIsTodayOrYesterday = (dateString: string) => {
  const date = moment(dateString);
  const today = moment();
  const yesterday = today.clone().subtract(1, "days");

  const isToday = date.isSame(today, "day");
  const isYesterday = date.isSame(yesterday, "day");

  return isToday ? "Today" : isYesterday ? "Yesterday" : "";
};

export function getPreviousDayString(
  dateString: string,
  time: "prev" | "next"
) {
  const date = moment(dateString);
  const previousDay = date.subtract(1, "days").format("YYYY-MM-DD");
  const nextDay = date.add(2, "days").format("YYYY-MM-DD");
  return time === "prev" ? previousDay : nextDay;
}
