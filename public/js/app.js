//yconsole.log('Client side javascript file is loaded')

// fetch('ht    tp:  //puzzle    .mead  .io   /puzzle   ')
//     .then(res => {
//         return res.json().then((res) => {
//             console.log(res)
//         })
//     })

//Assignment
//Goal: fetch weather!
//
//1. Setup a call to detch to fetch weather for Boston
//2. Get the parse JSON response
// - If error property print error,
// - If no error property, print location and forecast
//4. Refresh browser and test your work
// fetch('http://localhost:3000/weather?address=Mostar')
//     .then(res => {
//         return res.json().then(res => {
//             //error je custom error koji smo mi kreirali ukoliko je nepostojeci unos ili unos nije pronadjen
//             if (res.error) {
//                 console.log(res.error)
//             } else {
//                 console.log(res.location)
//                 console.log(res.forecast)
//             }
//         })
//     })

const weatherFrom = document.querySelector('.form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    //Assignment
    //
    //1. Select the second message p from Javascript
    //2. Just before fetch, render loading message and empty p
    //3. If error, render error
    //4. If no error, render location and forecast
    //5. Test your work! Search for errors and for valid locations
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    
    //End Assignment
    
    //Assignment
    //
    //1. Migrate fetch call into the submit callback
    //2. Use the search text as the address query string value
    //3. Submit the form with a valid and invalid value to test
    fetch(`/weather?address=${location}`)
    .then(res => {
        return res.json().then(res => {
            //error je custom error koji smo mi kreirali ukoliko je nepostojeci unos ili unos nije pronadjen
            if (res.error) {
                messageOne.textContent = res.error
            } else {
                messageOne.textContent = res.location
                messageTwo.textContent = res.forecast
                console.log(res.location)
                console.log(res.forecast)
            }
        })
    })
    //End Assignment
})