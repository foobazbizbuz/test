function solution(string){
    let stack = [];
    function operation(stack,str){
        if(str === 'DUP')
            return stackDuplicateTop(stack);
        if(str === 'POP')
            return stackPop(stack);
        if(str === '+')
            return stackAddTopTwo(stack);
        if(str === '-')
            return stackSubTopTwo(stack);

        return stackPush(stack,parseInt(str));
    }
    try {
        stack = string.split(' ').reduce(operation,stack);
    }catch(e){
        return -1;
    }
    return stack[stack.length - 1];
};
const stackPop = stackSlice((stack)=>{
    if(!stack.length) throw new Error({message:"Your stack was empty - operation not possible :("});
    var val = stack.pop();
    return stack;
});
const stackDuplicateTop = stackSlice((stack)=>{
    if(!stack.length) throw new Error({message:"Your stack was empty - operation not possible :("});
    stack.push(stack[stack.length - 1]);
    return stack;
});
const stackAddTopTwo = stackSlice((stack)=>{
    if(stack.length < 2) throw new Error({message:"Your stack was to short - duplicating the top two entries wasn't possible :("});
    var val1 = stack.pop();
    var val2 = stack.pop();
    var newVal = val1 + val2;
    stack.push(newVal);
    return stack;
});
const stackSubTopTwo = stackSlice((stack)=>{
    if(stack.length < 2) throw new Error({message:"Your stack was to short - duplicating the top two entries wasn't possible :("});
    var val1 = stack.pop();
    var val2 = stack.pop();
    var newVal = val1 - val2;
    if(newVal < 0) throw new Error({message:"new value was negative! Bad time :("});
    stack.push(newVal);
    return stack;
});
const stackPush = stackSlice((stack,val)=>{
    if(val < 0) throw new Error({messge: "Negtive integers are bad :("})
    stack.push(val);
    return stack;
});
function stackSlice(func){
    return function(){
        var args = Array.prototype.slice.call(arguments);
        args[0] = args[0].slice();
        return func.apply(null,args);
    }
};

console.log(solution("13 DUP 4 POP 5 DUP + DUP + -"))
// console.log(solution("13 DUP -4 POP 5 DUP + DUP + -"))
// console.log(solution("13 DUP"))
