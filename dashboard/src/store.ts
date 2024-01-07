// store.js
import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    courses: []
  }),
  actions: {
    setCourses(courses) {
      this.courses = courses;
    }
  }
});