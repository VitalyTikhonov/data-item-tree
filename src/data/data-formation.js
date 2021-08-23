import { getRandomNumber } from '../utils'
import { v4 as getUid } from 'uuid';

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

for (let i = 0; i <= 19; i++) {
  data.push(
    {
      "id": getUid(),
      "email": `fakeEmail${i + 1}`,
      "firstName": `FakeFirstName${i + 1}`,
      "patronymic": `FakePatronymic${i + 1}`,
      "lastName": `FakeLastName${i + 1}`,
      "role": "visitor",
      "isEmailVerified": Boolean(getRandomNumber(0, 1)),
      "isBanned": Boolean(getRandomNumber(0, 1)),
      "requestedDeletion": Boolean(getRandomNumber(0, 1)),
      "phone": makeFakeTelNumber(),
      "doctorNotes": `FakeDoctorNotes${i + 1}`
    }
  )
}

export { data }
