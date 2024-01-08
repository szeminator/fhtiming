// store.js
import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    courses: [] as any[],
    allResults: [] as any[],
    allSplitIDs: [] as number[],
    eventid: 0,
  }),
  actions: {
    setCourses(courses: any[]) {
      this.courses = courses;
    },
    setAllResultData(results: any[]) {
      this.allResults = results;
    },
    setAllSplitIDs(splitNumbers: number[]) {
      this.allSplitIDs = splitNumbers;
    },
    setEventID(eventid: number) {
      this.eventid = eventid;
    }
  }
});