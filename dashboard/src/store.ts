import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    courses: [] as any[],
    allResults: [] as any[],
    allSplitIDs: [] as number[],
    selectedSplitIDNamePairs: [] as any[],
    eventid: 0,
    nettoTimeIdentifier: 0,
    nettoTime: 0,
    selectedCourse: 0,
    selectedSplitIDs: [] as string[],
    chartdataKeys: [] as string[],
    selectedKeys: [] as any[],
    boxOptions: [
      { id: 0, modalTitle: 'Who is currently the fastest woman?', contentTitle: 'Currently Leading Woman', content: '' },
      { id: 1, modalTitle: 'Who is currently the fastest man?', contentTitle: 'Currently Leading Man', content: '' },
      { id: 2, modalTitle: 'Who will reach the finish line next?', contentTitle: 'Next Person at the Finish', content: '' },
      { id: 3, modalTitle: 'How many people are still in section 1?', contentTitle: '# of Persons in 1st Section', content: '' },
      { id: 4, modalTitle: 'How many people are still in section 2?', contentTitle: '# of Persons in 2nd Section', content: '' },
      { id: 5, modalTitle: 'How many have already crossed the finish line?', contentTitle: 'Runners at the Finish:', content: 'None yet' },
      { id: 6, modalTitle: 'How many are still at the start?', contentTitle: 'Runners at the Start:', content: 'None' },
      { id: 7, modalTitle: 'How many are supposed to start?', contentTitle: 'Runners altogether:', content: 'None' },
      ],
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
    setNettoTimeIdentifier(identifier: number) {
      this.nettoTimeIdentifier = identifier;
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
    setNettoSplitnr(nettoTime: number) {
      this.nettoTime = nettoTime;
    },
  }
});