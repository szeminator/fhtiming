// store.js
import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    courses: [] as any[],
    eventid: 0,
  }),
  actions: {
    setCourses(courses: any[]) {
      this.courses = courses;
    },
    setEventID(eventid: number) {
      this.eventid = eventid;
    }
  }
});