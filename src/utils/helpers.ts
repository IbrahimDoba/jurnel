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

  return isToday
    ? "Today"
    : isYesterday
    ? "Yesterday"
    : date.toLocaleString().length > 13
    ? date.toLocaleString().substring(0, 11)
    : date.toLocaleString;
};
export function getDateByOperation(
  _data: journalType[],
  currentDate: string,
  time: "previous" | "next"
) {
  const currentOrderData = [..._data].reverse();
  const formattedCurrentDate = moment(currentDate, "YYYY-MM-DD");
  // lets fes split the array at the index pf tje date
  const currentDateIndex = currentOrderData.findIndex(
    (item) => item.dateCreated === currentDate
  );
  const secondSplit = [...currentOrderData]; // if we split in the next line below this will be reduces to what is left
  const firstSplit = secondSplit.slice(0, currentDateIndex); // here we dey get all d array items before the current object date
  console.log("SPLIT ONE: ", firstSplit, "SPLIT 2: ", secondSplit);

  // NOW IF THE OPERATION IS TO GO TO A PREVIOUS DATE, WE WORK WITH THE FIRST SPLIT AND VICE VERSA
  if (time === "previous") {
    const findNearestPreviousDate = firstSplit // THIS WILL GET THE FIRST ITEM THAT IS BEFORE THE CURRENT DATE, SO LING AS THE ARRAY IS SORTED THIS SHOULD WORK
      .reverse()
      .find((item) =>
        moment(item.dateCreated, "YYYY-MM-DD").isBefore(formattedCurrentDate)
      );
    return findNearestPreviousDate
      ? findNearestPreviousDate.dateCreated
      : currentDate;
  } else {
    const findNearestNextDate = secondSplit.find((item) =>
      moment(item.dateCreated, "YYYY-MM-DD").isAfter(formattedCurrentDate)
    ); // no need to reverse this array cus we are looping forward
    return findNearestNextDate ? findNearestNextDate.dateCreated : currentDate;
  }
}
