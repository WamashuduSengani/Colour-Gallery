/*
 * Functionality of the help button
 */

let help_button = document.getElementById("help")
let exit_help = document.getElementById("exit_help")
let help_container = document.getElementById("help_info_container")

help_button.addEventListener("click", () => {

    console.log("clicked display flex")
    help_container.style.right = "1rem";

})

exit_help.addEventListener("click", () => {

    console.log("clicked display none")
    help_container.style.right = "-25rem";

})