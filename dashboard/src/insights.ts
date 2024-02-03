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
    let splitIDs = store.selectedSplitIDNamePairs;
    let nettoTimeIdentifier = store.nettoTimeIdentifier;
    let nettoSplit = splitIDs.filter(split => split.Splitnr === nettoTimeIdentifier.toString());
    if (nettoSplit.length === 0) {
        return "no time identifier"; // No netto time identifier in the data
    }
    let nettoSplitName = nettoSplit[0].Splitname + "_Time"; 

    let females = chartdata.filter(
        data => data['gender']==="W"); 

    if (females.length === 0) {
        return "no data"; // No females in the data
    }

    females = females.filter(
        data => data[nettoSplitName]!="-"); 

    if (females.length === 0) {
        return "no data"; // No females in the data
    }

    let leadingWoman = [];
    for (let i = 0; i < females.length; i++) {
        if (leadingWoman.length == 0 || females[i][nettoSplitName] < leadingWoman[nettoSplitName]) {
            leadingWoman = females[i];
        }
    }

    //console.log(leadingWoman);
    //console.log(leadingWoman.first);
    //console.log(leadingWoman.last);
    return leadingWoman.first + " " + leadingWoman.last;
}

export function fastestMan() {    
    let store = useStore();
    let chartdata = store.allResults;
    let splitIDs = store.selectedSplitIDNamePairs;
    let nettoTimeIdentifier = store.nettoTimeIdentifier;
    let nettoSplit = splitIDs.filter(split => split.Splitnr === nettoTimeIdentifier.toString());
    if (nettoSplit.length === 0) {
        return "no time identifier"; // No netto time identifier in the data
    }
    let nettoSplitName = nettoSplit[0].Splitname + "_Time"; 

    let males = chartdata.filter(
        data => data['gender']==="M"); 

    if (males.length === 0) {
        return "no data"; // No females in the data
    }

    males = males.filter(
        data => data[nettoSplitName]!="-"); 

    if (males.length === 0) {
        return "no data"; // No females in the data
    }

    let leadingMan = [];
    for (let i = 0; i < males.length; i++) {
        if (leadingMan.length == 0 || males[i][nettoSplitName] < leadingMan[nettoSplitName]) {
            leadingMan = males[i];
        }
    }

    //console.log(leadingMan);
    //console.log(leadingMan.first);
    //console.log(leadingMan.last);
    return leadingMan.first + " " + leadingMan.last;
}

export function nextSpeakerRunner() {
    let store = useStore();
    let chartdata = store.allResults;
    let splitIDs = store.selectedSplitIDNamePairs;
    let speakerTimeIdentifier = '196';
    let speakerSplit = splitIDs.filter(split => split.Splitnr === speakerTimeIdentifier.toString());
    if (speakerSplit.length === 0) {
        return "no time identifier"; // No speaker time identifier in the data
    }
    let speakerSplitName = speakerSplit[0].Splitname + "_Time"; 

    let runners = chartdata.filter(data => data[speakerSplitName]!="-"); 
    if (runners.length === 0) {
        return "no data"; // None at speaker in the data
    }

    let nextRunner = [];
    for (let i = 0; i < runners.length; i++) {
        if (nextRunner.length == 0 || runners[i][speakerSplitName] > nextRunner[speakerSplitName]) {
            nextRunner = runners[i];
        }
    }

    console.log(nextRunner);
    console.log(nextRunner.first);
    console.log(nextRunner.last);
    return nextRunner.first + " " + nextRunner.last;
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

export function countAllRunners() {
    let store = useStore();
    let chartdata = store.allResults;
    return chartdata.length;

}


export function countRunnersThatDidntStartYet() {
    let store = useStore();
    let chartdata = store.allResults;
    let allSplitIDNamePairs = store.selectedSplitIDNamePairs;

    let splitNameForStart = allSplitIDNamePairs.find(split => split.Splitnr === startSplitID.toString())?.Splitname + "_Time"

    let filteredData = chartdata.filter(data => 
        data[splitNameForStart] && data[splitNameForStart] == "-" && data['status'] != "DNF"
    );
    return filteredData.length;
}

export function countRunnersThatDNF() {
    let store = useStore();
    let chartdata = store.allResults;
    let filteredData = chartdata.filter(data => 
        data['status'] === "DNF"
    );
    return filteredData.length;
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
        (!data[splitNameForFinish] || data[splitNameForFinish] === "-") && data['status'] != "DNF"
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
        (!data[splitNameForFinish] || data[splitNameForFinish] === "-") && data['status'] != "DNF"
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
        (!data[splitNameForFinish] || data[splitNameForFinish] === "-") && data['status'] != "DNF"
    );

    return filteredData.length;
}

export function countRunnersThatFinished() {
    let store = useStore();
    let chartdata = store.allResults;
    let allSplitIDNamePairs = store.selectedSplitIDNamePairs;

    let splitNameForFinish = allSplitIDNamePairs.find(split => split.Splitnr === finishSplitID.toString())?.Splitname + "_Time"

    let filteredData = chartdata.filter(data => 
        data[splitNameForFinish] && data[splitNameForFinish] !== "-" && data['status'] != "DNF"
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