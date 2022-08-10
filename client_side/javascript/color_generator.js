/**
* Adding color functionality
*/

let colorContainer = document.getElementById("color_gallery_container")

window.addEventListener("load", async () => {

    const response = await fetch("/default_colors")
    const data = await response.json()

    data.forEach(colorDetails => {

        let colorName = colorDetails.color_name
        let colorType = colorDetails.color_type
        let colorWrapper = document.createElement('div')
        let removeColor

        colorWrapper.setAttribute('class', `color_wrapper`)
        colorWrapper.value = `${colorName}`
        colorWrapper.textContent = `${colorName}`

        if(colorType !== 'default') {
            removeColor = document.createElement('div')
            removeColor.setAttribute('class', 'remove_color')
            colorWrapper.appendChild(removeColor)
        }

        colorContainer.appendChild(colorWrapper)

        colorWrapper.onmouseover = () => {
            colorWrapper.style.border = `2px solid ${colorName}`
            colorWrapper.style.backgroundColor = `${colorName}`
        }

        colorWrapper.onmouseleave = () => {
            colorWrapper.style.border = `2px solid #E0e0e0`
            colorWrapper.style.backgroundColor = `transparent`
        }

        colorWrapper.addEventListener("click", () => {
            document.body.style.backgroundColor = colorWrapper.value
        })
    });
})

/**
* Input color in Form 
*/

let input_form = document.getElementById("input_form")
let color_input = document.getElementById("color_input")
let open_input_form = document.getElementById("add_color")
let add_color_button = document.getElementById("add_color_button")
let exit_input_form = document.getElementById("exit_input_form")
let support_bool

color_input.addEventListener("input", () => {

    let input_value = color_input.value
    support_bool = CSS.supports('color', color_input.value)

    if (support_bool) {
        color_input.style.border = `2px solid ${input_value}`
    } else {
        color_input.style.border = "2px solid #949494"
    }
})

open_input_form.addEventListener("click", () => {
    input_form.style.opacity = "1"
})

exit_input_form.addEventListener("click", () => {
    input_form.style.opacity = "0"
})

add_color_button.addEventListener("click", async () => {

    const color_name = color_input.value
    const color_type = "non-default"
    const data = {color_name, color_type, support_bool}
    
    console.log(data)
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/add_color', options)
    const serverData = await response.json()
    support_bool = false
})

