const {Open} = require('unzipper')
const fs = require('fs')
const path = require('path')

const walkFile = path.join(__dirname, '..', 'zip', 'facil.zip')

async function decryptFile(password) {
   try {
    const directory = await Open.file(walkFile)
    const extracted = await directory.files[0].buffer(password)
    console.log(extracted.toString(), ' PASS: ' + password)
    console.timeEnd('time')
    return;
  } catch (err) {}    
}

function generateNumbers(k) {
  for (let index = 0; index < k; index++) {
    console.log('Combinations possibles: ', index)
    decryptFile(index)
  }
}

async function wordlists(name) {
  try {
    const data = fs.readFileSync(`./wordlists/${name}`, 'utf8')
    const lists = data.toString().split('\n')
    lists.forEach(pass => {
      if (Number(pass)) {
        decryptFile(Number(pass))
      } else {
        decryptFile(pass)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

function generateLettersAndNumbers(t) {
  const alf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
  'l', 'm', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  for (let index = 0; index < k; index++) {
    // console.log(index)
    decryptFile(index)
  }
}

function execute(acc) {
  console.time('time')

  switch (acc) {
    case 1:
      generateNumbers(9999)
      break;
    case 2:
      wordlists('one.txt')
      break;
    case 3:
      generateLettersAndNumbers(8)
      break;
    default:
      console.log('nothing...')
      break;
  }
}
execute(2)
