import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    courses: [] as any[],
    allResults: [] as any[],
    allSplitIDs: [] as number[],
    selectedSplitIDNamePairs: [] as any[],
    eventid: 0,
    selectedCourse: 0,
    selectedSplitIDs: [] as string[],
    chartdataKeys: [] as string[],
    selectedKeys: [] as any[],
  }),
  actions: {
    setCourses(courses: any[]) {
      this.courses = courses;
    },
    setAllResultData(results: any[]) {
      this.allResults = results;
    },
    setAllSplitIDNamePairs(allSplitIDNamePairs: any[]) {
      this.selectedSplitIDNamePairs = allSplitIDNamePairs;
    },
    setAllSplitIDs(splitNumbers: number[]) {
      this.allSplitIDs = splitNumbers;
    },
    setEventID(eventid: number) {
      this.eventid = eventid;
    },
    setSelectedCourse(selectedCourse: number) {
      this.selectedCourse = selectedCourse;
    },
    setSelectedSplitIDs(selectedSplitIDs: string[]) {
      this.selectedSplitIDs = selectedSplitIDs;
    },
    setChartdataKeys(chartdataKeys: string[]) {
      this.chartdataKeys = chartdataKeys;
    },
    setSelectedKeys(selectedKeys: any[]) {
      this.selectedKeys = selectedKeys;
    },
  }
});