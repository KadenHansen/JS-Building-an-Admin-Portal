
// Your Code Here
async function retrieveData(){
    let response = await fetch("http://localhost:3001/listBooks")
    let bookData = await response.json()

    bookData.forEach(book => {
        let div = document.getElementById("root")
        div.innerHTML += `       
        <p class="lead ms-3 mt-3 mb-0">${book.title}</p>
        <form class="form ms-3">
        <input type="number" id="book-${book.id}-quantity" value="${book.quantity}">
        <input id="${book.id}" class="button" type="submit" value="Save">
        </form>
        `
    })
    let form = document.querySelectorAll(`.form`)
    form.forEach(book => {
        book.addEventListener("submit", updateBookQuantity)
    })
}

async function updateBookQuantity(e){
    e.preventDefault();
    let bookID = parseInt(e.target[1].id)
    let bookQuantity = e.target[0].value
    
    await fetch("http://localhost:3001/updateBook", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": bookID,
            "quantity": `${bookQuantity}`,
        })
    })
}

retrieveData()