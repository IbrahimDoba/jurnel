import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { journalType } from "../../../types";
import { sortJournalsByDate } from "@/utils/helpers";

type initialStateType = {
  journals: journalType[];
};
const initailState: initialStateType = {
  journals: [],
};
const journalSlice = createSlice({
  name: "journal",
  initialState: initailState,
  reducers: {
    fetchJournals: (state, action: PayloadAction<journalType[]>) => {
      console.log("LOGIN DISPATCH: ", action.payload);
      state.journals = action.payload;
    },
    updateJournal: (state, { payload }: { payload: any }) => {
      const findJournalIndex = state.journals.findIndex(
        (j) => j.id === payload.id
      );
      state.journals[findJournalIndex] = {
        ...state.journals[findJournalIndex],
        ...payload,
      };
    },
    addJournal: (state, { payload }: { payload: journalType }) => {
      const combinedJournals = sortJournalsByDate([...state.journals, payload]);
      state.journals = combinedJournals;
    },
    deleteJournal: (state, { payload }: { payload: any }) => {
      const filterOutJournal = state.journals.filter(
        (j) => j.id !== payload.id
      );
      state.journals = filterOutJournal;
    },
  },
});

export const { fetchJournals, updateJournal, deleteJournal, addJournal } =
  journalSlice.actions;
export default journalSlice.reducer;
