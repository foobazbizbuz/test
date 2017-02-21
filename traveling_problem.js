function solution(list){
    let unVals       = uniqueVals(list);
    let initialTable = buildBaseTable(list, unVals);
    let filledTable  = addToTable(list,initialTable,unVals);
    //Removes the null vals then finds the shortest entry in the table, the answer
    return filledTable.filter(a => !!a)
                      .reduce((a,b)=> (a.length > b.length ? b : a));
};

const uniqueVals = (list) => list.reduce((accum,val)=>{ accum[val] = true; return accum; },{});

const buildBaseTable = (list,uniqueVals)=>{
    let table               = [];
    let shrinkingSubSection = [];
    let growingSubsection   = [];
    let nextI               = 0;
    let prevTightenedSubSection;

    while(!listContainsAllVals(growingSubsection,uniqueVals)){  // Building a table to create a sliding-window/dynamic programming approach. o(n).
        growingSubsection = list.slice(0,nextI++);              // Initial entry represents index where a section could contain all the values.
    }                                                           // Consists of moving the "right" side of the list until in contains all unique vals.
    table = new Array(nextI-2).fill(null);                      // All following entries will be dependent of previous.
                                                                //  [1,1,2,3,3,4,1,1,1,1,2,3,4,1]
                                                                //   | . . . . | <- First selection.

    tightenedSubSection = growingSubsection.slice();                                              // Need to "tighten" the inital entry to remove extraneous values entered during inital stretch.
    while(listContainsAllVals(tightenedSubSection,uniqueVals)){                                   // Consists of moving the "left" side until its missing one of the unique vals.
        prevTightenedSubSection = tightenedSubSection.slice();                                    //  [1,1,2,3,3,4,1,1,1,1,2,3,4,1]
        tightenedSubSection = tightenedSubSection.slice(1,growingSubsection.tightenedSubSection); //     | . . . | <- tightened selection. [1,2,3,3,4]
        if(!listContainsAllVals(tightenedSubSection,uniqueVals)){                                 // Table with first entry. Looks like [null,null,null,null,[1,2,3,3,4]]
            growingSubsection = prevTightenedSubSection;
            break;
        }
    }

    table.push(growingSubsection);
    return table;
}

const listContainsAllVals = (list,setObj)=>{
    return Object.keys(setObj).reduce((accum,key)=>{
        if(!accum) return accum;
        return (list.indexOf(parseInt(key)) !== -1);
    },true)
};

const addToTable = (list,table, uniqueVals) => {
    let prevList,lastList,newList;
    
    if(table.length === list.length) return table; // If we've filled the table, we have our answer.
    lastList = table[table.length - 1];            // Get previous list containing all the unique vals.
    newList = lastList.slice();                    // Make a copy of the list.
    newList.push(list[table.length]);              // Initialize the new list with one more member - being the next member.

    while(listContainsAllVals(newList,uniqueVals)){
        prevList = newList.slice();
        newList = newList.slice(1,newList.length);
        if(!listContainsAllVals(newList,uniqueVals)){ //Same process from before, moving the left side of the list until we are missing one of the unique vals.
            newList = prevList;
            break;
        }
    }
    table.push(newList);
    return addToTable(list,table, uniqueVals);
}
function solution1(){
    // const tlist = [1,2,3,2,4,1]
    // const tlist = [7, 3, 7, 3, 1, 3, 4, 1]
    const tlist = [1,1,2,3,3,4,1,1,1,1,2,3,4,1]
    return solution(tlist)
}
console.log(solution1())



