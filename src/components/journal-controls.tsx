import { checkIsTodayOrYesterday } from "@/utils/helpers";
import moment from "moment";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function JournalControls({
  handleRenderJournalByDate,
  dateCreated,
  noEntryForDate,
}: {
  handleRenderJournalByDate: (operation: "next" | "previous") => void;
  dateCreated: string;
  noEntryForDate: {
    next: boolean;
    previous: boolean;
  };
}) {
  const isToday = moment().format("YYYY-MM-DD") === dateCreated;
  return (
    <div className="lg:fixed top-10 left-40 flex flex-col gap-1">
      <div className="flex gap-2 justify-center items-center">
        <button
          type="button"
          title="previous day"
          className={`${
            noEntryForDate.previous ? "bg-[#a0f9db]" : "bg-accent"
          } p-0.5 rounded-md text-white relative`}
          onClick={() => handleRenderJournalByDate("previous")}
          disabled={noEntryForDate.previous}
        >
          <BiChevronLeft size={25} />
        </button>
        <span className="p-2 text-sm font-semibold text-accent bg-primary rounded-full">
          WG
        </span>
        <button
          type="button"
          title="next day"
          disabled={noEntryForDate.next || isToday}
          onClick={() => handleRenderJournalByDate("next")}
          className={` ${
            noEntryForDate.next || isToday ? "bg-[#a0f9db]" : "bg-accent"
          } p-0.5 rounded-md text-white`}
        >
          <BiChevronRight size={25} />
        </button>
      </div>
      <div className="leading-4 flex flex-col items-center">
        {/* replace with day e.g wednesday */}
        <p className="text-xl text-black">
          {`${checkIsTodayOrYesterday(dateCreated)}`}
        </p>{" "}
        {/* the date eg m/d/y */}
        <p className="text-accent text-sm">
          <span>{dateCreated}</span>
        </p>
      </div>
    </div>
  );
}

export default JournalControls;
