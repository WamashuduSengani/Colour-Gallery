/**
* Adding color functionality
*/

let colorContainer = document.getElementById("color_gallery_container")
let addColor = document.getElementById("add_color")

window.addEventListener("load", async () => {

    const response = await fetch("/default_colors")
    const data = await response.json()

    data.forEach(colorDetails => {

        let colorName = colorDetails.color_name
        let colorType = colorDetails.color_type
        let colorWrapper = document.createElement('div')
        let removeColor

        if(colorType !== 'default') {
            removeColor = document.createElement('div')
            removeColor.setAttribute('class', 'remove_color')
        }

        colorWrapper.setAttribute('class', `color_wrapper`)
        colorWrapper.value = `${colorName}`
        colorWrapper.textContent = `${colorName}`
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
