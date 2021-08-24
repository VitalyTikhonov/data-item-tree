import { getRandomNumber, download, getRandomArrayMember } from '../utils'
import { v4 as getUid } from 'uuid';
import { masculineRaw, feminineRaw } from './raw-first-names.json'
import masculineLastNames from './masculine-last-names.json'
import { LoremIpsum } from "lorem-ipsum";

const masculineFirstNames = masculineRaw.filter((i) => i.length > 1)
const feminineLastNames = masculineLastNames.map((i) => i + "а")
const feminineFirstNames = feminineRaw.filter((i) => i.length > 1)

// download(JSON.stringify(masculineFirstNames), 'masculine-first-names.json', 'application/json')
// download(JSON.stringify(feminineLastNames), 'feminine-last-names.json', 'application/json')
// download(JSON.stringify(feminineFirstNames), 'feminine-first-names.json', 'application/json')

let data = []

function makeFakeTelNumber(numOfDigits = 10, prefix = '+79') {
  let res = prefix
  let i = 1
  do {
    res = res + getRandomNumber(0, 8)
    i++
  } while (i <= numOfDigits)
  return res
}

function transliterate(word) {
  // https://stackoverflow.com/questions/11404047/transliterating-cyrillic-to-latin-with-javascript-function
  var answer = ""
    , a = {};

  a["Ё"] = "YO"; a["Й"] = "I"; a["Ц"] = "TS"; a["У"] = "U"; a["К"] = "K"; a["Е"] = "E"; a["Н"] = "N"; a["Г"] = "G"; a["Ш"] = "SH"; a["Щ"] = "SCH"; a["З"] = "Z"; a["Х"] = "H"; a["Ъ"] = "y";
  a["ё"] = "yo"; a["й"] = "i"; a["ц"] = "ts"; a["у"] = "u"; a["к"] = "k"; a["е"] = "e"; a["н"] = "n"; a["г"] = "g"; a["ш"] = "sh"; a["щ"] = "sch"; a["з"] = "z"; a["х"] = "h"; a["ъ"] = "y";
  a["Ф"] = "F"; a["Ы"] = "I"; a["В"] = "V"; a["А"] = "a"; a["П"] = "P"; a["Р"] = "R"; a["О"] = "O"; a["Л"] = "L"; a["Д"] = "D"; a["Ж"] = "ZH"; a["Э"] = "E";
  a["ф"] = "f"; a["ы"] = "i"; a["в"] = "v"; a["а"] = "a"; a["п"] = "p"; a["р"] = "r"; a["о"] = "o"; a["л"] = "l"; a["д"] = "d"; a["ж"] = "zh"; a["э"] = "e";
  a["Я"] = "Ya"; a["Ч"] = "CH"; a["С"] = "S"; a["М"] = "M"; a["И"] = "I"; a["Т"] = "T"; a["Ь"] = "y"; a["Б"] = "B"; a["Ю"] = "YU";
  a["я"] = "ya"; a["ч"] = "ch"; a["с"] = "s"; a["м"] = "m"; a["и"] = "i"; a["т"] = "t"; a["ь"] = "y"; a["б"] = "b"; a["ю"] = "yu";

  for (let i in word) {
    if (word.hasOwnProperty(i)) {
      if (a[word[i]] === undefined) {
        answer += word[i];
      } else {
        answer += a[word[i]];
      }
    }
  }
  return answer;
}

const emailDomains = [
  "mail.ru",
  "yandex.ru",
  "gmail.com",
  "yahoo.com",
]

export const categories = [
  { caption: "Администраторы", id: "admin" },
  { caption: "Врачи", id: "doctor" },
  { caption: "Пациенты", id: "patient" },
  { caption: "Посетители", id: "visitor" },
]

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

for (let i = 0; i <= 19; i++) {
  const gender = Boolean(getRandomNumber(0, 1))
  const name = [
    getRandomArrayMember(gender ? masculineFirstNames : feminineFirstNames),
    getRandomArrayMember(gender ? masculineLastNames : feminineLastNames),
  ]

  data.push(
    {
      "id": getUid(),
      "email": (transliterate(name[0] + "-" + name[1]) + "@" + getRandomArrayMember(emailDomains)).toLowerCase(),
      "gender": gender ? 'мужской' : 'женский',
      "firstName": name[0],
      "lastName": name[1],
      "category": getRandomArrayMember(categories),
      "isEmailVerified": Boolean(getRandomNumber(0, 1)),
      "isBanned": Boolean(getRandomNumber(0, 1)),
      "requestedDeletion": Boolean(getRandomNumber(0, 1)),
      "phone": makeFakeTelNumber(),
      "doctorNotes": lorem.generateParagraphs(getRandomNumber(1, 3)).split('\n')
    }
  )
}

// download(JSON.stringify(data), 'data.json', 'application/json')

export default data
