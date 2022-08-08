/**
* Adding color functionality with the 
*/


let addColor = document.getElementById("add_color")

addColor.addEventListener("click", async () => {

    console.log("Successfully clicked...")

    const number1 = 5
    const number2 = 5

    const data = [{number1, number2}]
    const options = {
        method: "POST",
        body: JSON.stringify(data)
    }
    const response = await fetch("/default_colors", options)
    const serverRespone = await response.json()
    console.log(serverRespone)
    


})