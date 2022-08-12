/**
* Adding color functionality
*/

let colorContainer = document.getElementById("color_gallery_container")

window.addEventListener("load", async () => {

    const response = await fetch("/all_colors")
    const data = await response.json()

    data.forEach(colorDetails => {

        let color_name = colorDetails.color_name
        let color_type = colorDetails.color_type
        let color_wrapper = document.createElement('div')
        let color_html_text = document.createElement('p')
        let remove_color

        color_wrapper.setAttribute('class', `color_wrapper`)
        color_html_text.setAttribute('class', 'color_html_text')
        color_wrapper.value = `${color_name}`
        color_html_text.textContent = `${color_name}`
        color_wrapper.appendChild(color_html_text)

        if(color_type !== 'default') {
            remove_color = document.createElement('div')
            remove_color.innerHTML = '&times;'
            remove_color.setAttribute('class', 'remove_color')
            color_wrapper.appendChild(remove_color)

            remove_color.addEventListener("click", async (e) => {
                e.stopPropagation()

                const data = { color_name, color_type }
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                const response = await fetch('/remove_color', options)
                const responseBody = await response.json()
                console.log(responseBody)

                color_wrapper.style.display = 'none'
                
            })
            
        }

        colorContainer.appendChild(color_wrapper)

        color_wrapper.onmouseover = () => {
            color_wrapper.style.border = `2px solid ${color_name}`
            color_wrapper.style.backgroundColor = `${color_name}`
        }

        color_wrapper.onmouseleave = () => {
            color_wrapper.style.border = `2px solid #E0e0e0`
            color_wrapper.style.backgroundColor = `transparent`
        }

        color_wrapper.addEventListener("click", () => {
            document.body.style.backgroundColor = color_wrapper.value
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
    input_form.style.display = "flex"
})

exit_input_form.addEventListener("click", () => {
    input_form.style.display = "none"
})

add_color_button.addEventListener("click", async (e) => {

    const color_name = color_input.value.toLowerCase()
    const color_type = "non-default"
    const data = {color_name, color_type, support_bool}

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

/**
* Reload page  
*/
let reload_page = document.getElementById('reload_page')

reload_page.addEventListener("click", () => {
    window.location.reload()
})