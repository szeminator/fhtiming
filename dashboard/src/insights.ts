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
    console.log(filteredData);
    return filteredData;
}

export function fastestWoman() {    
    let store = useStore();
    let chartdata = store.allResults;
    let females = chartdata.filter(
        data => data['gender']==="W"); 

    if (females.length === 0) {
        return null; // No females in the data
        }

    let leadingWoman = females[0];
    for (let i = 1; i < females.length; i++) {
        if (females[i]['nettoTime'] < leadingWoman['nettoTime']) {
            leadingWoman = females[i];
        }
    }
    console.log(leadingWoman);
    return leadingWoman.first + " " + leadingWoman.last;
}

export function filterFemales(){
    let store = useStore();
    let chartdata = store.allResults;
    let onlyFemales = chartdata.filter(
        data => data['gender']==="W");
        return onlyFemales; 
}

export function filterMales(){
    let store = useStore();
    let chartdata = store.allResults;
    let onlyMales = chartdata.filter(
        data => data['gender']==="M");
        return onlyMales; 
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

export function countRunnersInStartSection() {
    let store = useStore();
    let chartdata = store.allResults;
    let allSplitIDNamePairs = store.selectedSplitIDNamePairs;

    let splitNameForStart = allSplitIDNamePairs.find(split => split.Splitnr === startSplitID.toString())?.Splitname + "_Time"
    let splitNameForTurn1 = allSplitIDNamePairs.find(split => split.Splitnr === turn1SplitID.toString())?.Splitname + "_Time"
    let splitNameForTurn2 = allSplitIDNamePairs.find(split => split.Splitnr === turn2SplitID.toString())?.Splitname + "_Time"
    let splitNameForFinish = allSplitIDNamePairs.find(split => split.Splitnr === finishSplitID.toString())?.Splitname + "_Time"

    let filteredData = chartdata.filter(data => 
        data[splitNameForStart] && data[splitNameForStart] !== "-" &&
        (!data[splitNameForTurn1] || data[splitNameForTurn1] === "-") &&
        (!data[splitNameForTurn2] || data[splitNameForTurn2] === "-") &&
        (!data[splitNameForFinish] || data[splitNameForFinish] === "-")
    );
    return filteredData.length;
}

export function countRunnersInTurn1Section() {
    let store = useStore();
    let chartdata = store.allResults;
    let allSplitIDNamePairs = store.selectedSplitIDNamePairs;

    let splitNameForTurn1 = allSplitIDNamePairs.find(split => split.Splitnr === turn1SplitID.toString())?.Splitname + "_Time"
    let splitNameForTurn2 = allSplitIDNamePairs.find(split => split.Splitnr === turn2SplitID.toString())?.Splitname + "_Time"
    let splitNameForFinish = allSplitIDNamePairs.find(split => split.Splitnr === finishSplitID.toString())?.Splitname + "_Time"

    let filteredData = chartdata.filter(data => 
        data[splitNameForTurn1] && data[splitNameForTurn1] !== "-" &&
        (!data[splitNameForTurn2] || data[splitNameForTurn2] === "-") &&
        (!data[splitNameForFinish] || data[splitNameForFinish] === "-")
    );

    return filteredData.length;
}

export function countRunnersInTurn2Section() {
    let store = useStore();
    let chartdata = store.allResults;
    let allSplitIDNamePairs = store.selectedSplitIDNamePairs;

    let splitNameForTurn2 = allSplitIDNamePairs.find(split => split.Splitnr === turn2SplitID.toString())?.Splitname + "_Time"
    let splitNameForFinish = allSplitIDNamePairs.find(split => split.Splitnr === finishSplitID.toString())?.Splitname + "_Time"

    let filteredData = chartdata.filter(data => 
        data[splitNameForTurn2] && data[splitNameForTurn2] !== "-" &&
        (!data[splitNameForFinish] || data[splitNameForFinish] === "-")
    );

    return filteredData.length;
}

export function countRunnersThatFinished() {
    let store = useStore();
    let chartdata = store.allResults;
    let allSplitIDNamePairs = store.selectedSplitIDNamePairs;

    let splitNameForFinish = allSplitIDNamePairs.find(split => split.Splitnr === finishSplitID.toString())?.Splitname + "_Time"

    let filteredData = chartdata.filter(data => 
        data[splitNameForFinish] && data[splitNameForFinish] !== "-"
    );

    return filteredData.length;
}

export function countRunnersAtEachSection() {
    let countAtStart = countRunnersInStartSection();
    let countAtTurn1 = countRunnersInTurn1Section();
    let countAtTurn2 = countRunnersInTurn2Section();
    let countAtFinish = countRunnersThatFinished();

    return [countAtStart, countAtTurn1, countAtTurn2, countAtFinish];
}