import { useStore } from './store';
import { startSplitID, turn1SplitID, turn2SplitID, finishSplitID } from './hardcodedvalues';



export function fetchStartersThatDidntGetFar() {

    let store = useStore();
    let chartdata = store.allResults;
    let allSplitIDNamePairs = store.selectedSplitIDNamePairs;
    //console.log(allSplitIDNamePairs);
    //console.log(startSplitID)
    let splitNameForStart = allSplitIDNamePairs.find(split => split.Splitnr === startSplitID.toString())?.Splitname + "_Time"
    let splitNameForTurn1 = allSplitIDNamePairs.find(split => split.Splitnr === turn1SplitID.toString())?.Splitname + "_Time"
    let splitNameForTurn2 = allSplitIDNamePairs.find(split => split.Splitnr === turn2SplitID.toString())?.Splitname + "_Time"
    let splitNameForFinish = allSplitIDNamePairs.find(split => split.Splitnr === finishSplitID.toString())?.Splitname + "_Time"


    //console.log(splitNameForStart);
    let filteredData = chartdata.filter(data => 
        data[splitNameForStart] && data[splitNameForStart] !== "-" &&
        (!data[splitNameForTurn1] || data[splitNameForTurn1] === "-") &&
        (!data[splitNameForTurn2] || data[splitNameForTurn2] === "-") &&
        (!data[splitNameForFinish] || data[splitNameForFinish] === "-")
      );
    //console.log(filteredData);
    return filteredData;
}

export function selectRunnersForSplit() {
    let store = useStore();
    let chartdata = store.allResults;
    let allSplitIDNamePairs = store.selectedSplitIDNamePairs;
    let splitID = store.selectedSplitIDs[0];
    let splitName = allSplitIDNamePairs.find(split => split.Splitnr === splitID)?.Splitname + "_Time"
    let filteredData = chartdata.filter(data => data[splitName] && data[splitName] !== "-");
    console.log(filteredData);
    return filteredData;
}
