'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};
let moveCounter = 0;
// Start here. What is this function doing?
//This is logging the arrays/stacks in to the console. Called at prompt

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}
//Also called at prompt. Prints out string and counter
const printCounter = () =>{
  console.log("Number of moves: " + moveCounter++);
}
// Next, what do you think this function should do?
//takes piece of first stack and puts it on second stack
const movePiece = (startStack, endStack) => { 
  return stacks[endStack].push(stacks[startStack].pop())
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
//allows piece to go on empty array, then true if piece put on endStack is of lower value than last piece of new array
const isLegal = (startStack, endStack) => {
  if (stacks[endStack][stacks[endStack].length - 1] == undefined)
  {
    return true;
  }
  if (stacks[startStack][stacks[startStack].length - 1] < stacks[endStack][stacks[endStack].length - 1]) {
    return true;
  } 
  else if (stacks[startStack][stacks[startStack].length - 1] > stacks[endStack][stacks[endStack].length - 1]) {
    return false;
  }
}

// What is a win in Towers of Hanoi? When should this function run?
//After a piece is legally moved, a win occurs if stack b or c has 4 numbers in its array
const checkForWin = () => {
  if(stacks["b"].length == 4 || stacks["c"].length == 4){
    return true
  }
  else{
    return false
  }
}

// When is this function called? What should it do with its argument?
//Takes in user input and then runs other functions in order. If move is legal, then it will
//move the piece. Once it is moved it will check for a win. If the move is not legal it will 
//tell you the move is invalid. 
const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack,endStack)) {
    movePiece(startStack,endStack);
    if (checkForWin()==true) {
      console.log("You have won!");
    }
  } else console.log("Illegal move, try again");
}

const getPrompt = () => {
  printStacks();
  printCounter();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}
1
// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
