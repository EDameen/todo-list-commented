// Selects the class .fa-trash and stores it into the variable deleteBtn
const deleteBtn = document.querySelectorAll('.fa-trash')
// Selects the span and the class .item and stores it into the variable item
const item = document.querySelectorAll('.item span')
// Selects the class .item and .completed, as well as span and stores it into the variable itemCompleted
const itemCompleted = document.querySelectorAll('.item span.completed')

// Creates an array for deleteBtn, then loops through that array
Array.from(deleteBtn).forEach((element)=>{
    //An event listener which, on click, runs deleteItem for elements inside the deleteBtn variable
    element.addEventListener('click', deleteItem)
}) // Closes loop

// Creates an array for item, then loops through the array
Array.from(item).forEach((element)=>{
    //An event listener which, on click, runs markComplete for elements inside the item variable
    element.addEventListener('click', markComplete)
}) // Closes loop

// Creates an array for itemCompleted, then loops through the array
Array.from(itemCompleted).forEach((element)=>{
    //An event listener which, on click, runs markUnComplete for elements inside the itemCompleted variable
    element.addEventListener('click', markUnComplete)
})

// An asynchronous function that deletes an item
async function deleteItem(){
    // When clicking on span, goes to parent element (li), then itself, then gets text out of the childNode
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        // Responding with a fetch for deleteItem route
        const response = await fetch('deleteItem', {
            // Delete request to server
            method: 'delete',
            // Sets header request type to JSON
            headers: {'Content-Type': 'application/json'},
            // Request body sent to server
            body: JSON.stringify({
                // itemText hard-coded to 'itemFromJS'
              'itemFromJS': itemText 
            }) // Closes body request
          }) //   Closes response
        // Response in the form of json gets stored in data
        const data = await response.json()
        // Logging data to the console
        console.log(data)
        // Page reload
        location.reload()

    // Catches an error
    }catch(err){
        // Logs error to the console
        console.log(err)
    }
} // closes deleteItem function

// An asynchronous function that marks an item as complete
async function markComplete(){
    // When clicking on span, goes to parent element (li), then itself, then gets text out of the childNode
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        // Responding with a fetch with markComplete route
        const response = await fetch('markComplete', {
            // Put request to server
            method: 'put',
            // Sets the header request type to JSON
            headers: {'Content-Type': 'application/json'},
            // Request body sent to server
            body: JSON.stringify({
                // itemText hard-coded to 'itemFromJS'
                'itemFromJS': itemText
            })
          })
          // Response in the form of JSON gets stored in data
        const data = await response.json()
        // Logging data to the console
        console.log(data)
        // Page reload
        location.reload()

    // Catches an error
    }catch(err){
        // Logs error to the console
        console.log(err)
    }
} // Closes markComplete function

// Asynchronous function that marks an item as uncomplete
async function markUnComplete(){
    // When clicking on span, goes to parent element (li), then itself, then gets text out of the childNode
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        // Responding with a fetch with markUncComplete route
        const response = await fetch('markUnComplete', {
            // Put request to server
            method: 'put',
            // Sets the header request type to JSON
            headers: {'Content-Type': 'application/json'},
            // Request body sent to server
            body: JSON.stringify({
                // itemText hard-coded to 'itemFromJS'
                'itemFromJS': itemText
            })
          })
          // Response in the form of JSON gets stored in data
        const data = await response.json()
        // Logging data to the console
        console.log(data)
        // Page reload
        location.reload()

    // Catches an error
    }catch(err){
        // Logs error to the console
        console.log(err)
    }
} // Closes markUnComplete function