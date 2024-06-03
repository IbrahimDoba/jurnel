import moment from "moment";
import { SubscriptionType, journalType } from "../../types";

export const getNextOrPreviousDay = (
  dateString: string,
  operation: "next" | "previous"
) => {
  const date = moment(dateString, "YYYY-MM-DD");
  const newDate =
    operation === "next" ? date.add(1, "days") : date.subtract(1, "days");
  // console.log("NEW DATE: ", newDate.format("YYYY-MM-DD"));
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
  // console.log("DATE PASSED: ", currentDate, "second split: ", secondSplit);
  if (currentDateIndex > -1) {
    const firstSplit = secondSplit.slice(0, currentDateIndex); // here we dey get all d array items before the current object date

    // NOW IF THE OPERATION IS TO GO TO A PREVIOUS DATE, WE WORK WITH THE FIRST SPLIT AND VICE VERSA
    if (time === "previous") {
      const findNearestPreviousDate = firstSplit // THIS WILL GET THE FIRST ITEM THAT IS BEFORE THE CURRENT DATE, SO LING AS THE ARRAY IS SORTED THIS SHOULD WORK
        .reverse()
        .find((item) =>
          moment(item.dateCreated, "YYYY-MM-DD").isBefore(formattedCurrentDate)
        );
      const checkIfPreviousAvailable = _data.find((item) =>
        moment(item.dateCreated, "YYYY-MM-DD").isBefore(
          moment(findNearestPreviousDate?.dateCreated, "YYYY-MM-DD")
        )
      );
      const checkIfNextAvailable = _data.find((item) =>
        moment(item.dateCreated, "YYYY-MM-DD").isAfter(
          moment(findNearestPreviousDate?.dateCreated, "YYYY-MM-DD")
        )
      );
      // console.log(
      //   "PREV: ",
      //   checkIfPreviousAvailable?.dateCreated,
      //   "NEXT: ",
      //   checkIfNextAvailable?.dateCreated,
      //   "ACTUAL DATE: ",
      //   findNearestPreviousDate?.dateCreated
      // );
      return {
        dateValue: findNearestPreviousDate
          ? findNearestPreviousDate.dateCreated
          : currentDate,
        isPreviousAvailable: checkIfPreviousAvailable ? true : false,
        isNextAvailable: checkIfNextAvailable ? true : false,
      };
    } else {
      const findNearestNextDate = secondSplit.find((item) =>
        moment(item.dateCreated, "YYYY-MM-DD").isAfter(formattedCurrentDate)
      ); // no need to reverse this array cus we are looping forward
      const checkIfPreviousAvailable = _data.find((item) =>
        moment(item.dateCreated, "YYYY-MM-DD").isBefore(
          moment(findNearestNextDate?.dateCreated, "YYYY-MM-DD")
        )
      );
      const checkIfNextAvailable = _data.find((item) =>
        moment(item.dateCreated, "YYYY-MM-DD").isAfter(
          moment(findNearestNextDate?.dateCreated, "YYYY-MM-DD")
        )
      );
      // console.log(
      //   "PREV: ",
      //   checkIfPreviousAvailable?.dateCreated,
      //   "NEXT: ",
      //   checkIfNextAvailable?.dateCreated,
      //   "ACTUAL DATE: ",
      //   findNearestNextDate?.dateCreated
      // );
      return {
        dateValue: findNearestNextDate
          ? findNearestNextDate.dateCreated
          : currentDate,
        isPreviousAvailable: checkIfPreviousAvailable ? true : false,
        isNextAvailable: checkIfNextAvailable ? true : false,
      };
    }
  } else {
    const findNearestNextDate = _data.find((item) =>
      moment(item.dateCreated, "YYYY-MM-DD").isBefore(formattedCurrentDate)
    );
    const checkIfPreviousAvailable = _data.find((item) =>
      moment(item.dateCreated, "YYYY-MM-DD").isBefore(
        moment(findNearestNextDate?.dateCreated, "YYYY-MM-DD")
      )
    );
    const checkIfNextAvailable = _data.find((item) =>
      moment(item.dateCreated, "YYYY-MM-DD").isAfter(
        moment(findNearestNextDate?.dateCreated, "YYYY-MM-DD")
      )
    );
    // console.log(
    //   "PREV: ",
    //   checkIfPreviousAvailable?.dateCreated,
    //   "NEXT: ",
    //   checkIfNextAvailable?.dateCreated,
    //   "ACTUAL DATE: ",
    //   findNearestNextDate?.dateCreated
    // );
    return {
      dateValue: findNearestNextDate
        ? findNearestNextDate.dateCreated
        : currentDate,
      isPreviousAvailable: checkIfPreviousAvailable ? true : false,
      isNextAvailable: checkIfNextAvailable ? true : false,
    };
  }
}

export function sumArray(arr: number[]) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

export const checkMaxWords = (
  subType: SubscriptionType,
  totalWordsForTheDay: number
) => {
  switch (subType) {
    case "free":
      return totalWordsForTheDay >= 20 ? true : false;
    case "pro":
      return totalWordsForTheDay >= 15000 ? true : false;
    case "unlimited":
      return false;
    default:
      false;
  }
};
export const subscriptionExpired = (expirationDate: string | null) => {
  if (expirationDate) {
    const formatDate = moment(expirationDate);
    const today = moment();
    const isToday = formatDate.isSame(today, "day");
    return isToday ? true : false;
  }
  return false;
};

export function getText(html: string) {
  var divContainer = document.createElement("div");
  divContainer.innerHTML = html;
  return divContainer.textContent || divContainer.innerText || "";
}
