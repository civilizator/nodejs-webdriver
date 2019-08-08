module.exports = (id) => {
    if (id !== !1) {
        let element = document.getElementById(id)
        element.style.color = 'red'
        element.style.transition = ".5s 1s"
    }
}
