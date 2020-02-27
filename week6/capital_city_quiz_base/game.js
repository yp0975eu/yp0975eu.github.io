let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgain = document.querySelector('#play-again')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.


// select random country
function getRandomCountry() {
  return countriesAndCodes[Math.floor(Math.random() * Math.floor(countriesAndCodes.length))]
}

let targetCountry

function play() {
  targetCountry = getRandomCountry()
  randomCountryElement.innerText = targetCountry.name
  resultTextElement.innerText = ''
  userAnswerElement.value = ''
}

playAgain.addEventListener('click', function (event) {
  play()
})

play()


// TODO add a click event handler to the submitButton.  When the user clicks the button,
submitButton.addEventListener('click', async function (event) {
  //  * read the text from the userAnswerElement
  let userAnswer = userAnswerElement.value
  let apiAnswer = await getCapitalFromApi(targetCountry['alpha-2'])
  let correct = userAnswer.toLowerCase() === apiAnswer.toLowerCase()
  let message = `You guessed ${apiAnswer} ${correct ? 'correctly': 'incorrectly!'}`
  resultTextElement.innerText = message
})

function processApiResponse(data) {
  const payload = 1
  const countryInformation = 0
  if (data[payload] && data[payload][countryInformation] && data[payload][countryInformation].capitalCity) {
    return data[payload][countryInformation].capitalCity
  }
  alert('Api response does not have a capital :(')
}

//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
function getCapitalFromApi(countryCode) {
  const url = `http://api.worldbank.org/v2/country/${countryCode}?format=json`
  return fetch(url).then(res => {
    //  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
    if (!res.ok || !res.stats === 200) {
      alert(res.statusText)
      return
    }
    return res.json()
  }).then(processApiResponse) //  * If the API call was successful, extract the capital city from the World Bank API response.
}