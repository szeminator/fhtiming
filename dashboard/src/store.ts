// store.js
import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    courses: [] as any[]
  }),
  actions: {
    setCourses(courses: any[]) {
      this.courses = courses;
    }
  }
});