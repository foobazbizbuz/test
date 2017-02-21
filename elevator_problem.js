function solution(weightsList,targetFloorsList,numFloors,maxNumPeople,maxWeight){
    const weightFloorPairs = zip(weightsList,targetFloorsList);  //Im assuming the initial zipping of these wouldn't count as a "pass" necessarily.  I could see the argument go either way.
    const countStops = countStopsC(maxNumPeople,maxWeight);
    const reduction = weightFloorPairs.reduce(
                                countStops,
                                {numStops:0,numPeople:0,currentWeight:0,currentFloors:{}}
                            );
    return reduction.numStops;
};
const countStopsC = (maxNumPeople,maxWeight) => (accum, pair, idx, list) => {
    const {numStops,numPeople,currentWeight,currentFloors} = accum;
    const [newWeight,floor] = pair;
    const isDone = ((newWeight + currentWeight) > maxWeight) || numPeople === maxNumPeople;
    const isLast = idx === list.length - 1;
    const resp = Object.assign({},
        {numStops:       isDone ? numStops + Object.keys(currentFloors).length + 1 : numStops},
        {numPeople:      isDone ? 1                                                : numPeople + 1},
        {currentFloors:  isDone ? {[floor]:true}                                   : Object.assign(currentFloors,{[floor]:true})},
        {currentWeight:  isDone ? newWeight                                        : currentWeight + newWeight}
    );

    if(isLast) resp.numStops = resp.numStops + Object.keys(resp.currentFloors).length + 1;

    return resp;
};
const sum = (a,b) => a + b;
const zip = (l1,l2) => {
    var resp = [];
    for(var i = 0; i< l1.length;i++){
        resp.push([l1[i],l2[i]])
    }
    return resp;
};
function solution1(){
    //(===)9
    // var A = [60,200,140,20,180,20];
    // var B = [1,1,2,1,1,1];
    // var maxWeight = 200;
    // var maxNumPeople = 2;

    //(===)6
    // var maxWeight = 200;
    // var A = [60,80,40,60];
    // var B = [2,3,5,4];
    // var maxNumPeople = 2;

    //(===)5
    var maxWeight = 300;
    var A = [100,100,100,200,100];
    var B = [3,3,3,1,2];
    var maxNumPeople = 3;
    var M = 5

    return solution(A,B,M,maxNumPeople,maxWeight);
};
console.log(solution1())

