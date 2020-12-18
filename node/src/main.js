const {Open} = require('unzipper')
const fs = require('fs')
const path = require('path')

async function decryptFile(password) {
  try {
    const walkFile = path.join(__dirname, '..', 'zip', 'hard.zip')
    const directory = await Open.file(walkFile)
    const extracted = await directory.files[0].buffer(password)
    console.log(extracted.toString(), ' PASS: ' + password)
    return console.timeEnd('time')
  } catch (err) {}    
}

async function wordlists(name) {
  try {
    const data = fs.readFileSync(`./wordlists/${name}`, 'utf8')
    const lists = data.toString().split('\n')
    lists.forEach(pass => {
      decryptFile(pass)
    })
  } catch (err) {
    console.log(err)
  }
}

function generateNumbers(t) {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  allPossibleCombinations(numbers, t, '');
}

function allPossibleCombinations(input, length, curstr) {
  if(curstr.length === length) return;

  for (let e of input) {
    allPossibleCombinations(input, length, curstr + e)
    console.log(curstr + e)
    // decryptFile(curstr + input[i])
  }
}

function generateLettersAndNumbers(t) {
  const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
  'l', 'm', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', 
  '6', '7', '8', '9']

  allPossibleCombinations(chars, t, '');
}

function execute(acc) {
  console.time('time')
  /** fn('one.txt', 'facil.zip', 2)
   * .zip
   * .txt
   * qnt - chars
   */

  const obj = {
    '1': generateNumbers,//(4),
    '2': wordlists,//('one.txt'),
    '3': generateLettersAndNumbers,//(2),
  }

  obj[acc](2);
}
execute(3)
