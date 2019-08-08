module.exports = (id, text) => {
    if (id !== !1) {
        console.log("Set Color Found: " + id)
        let element = document.getElementById(id),
            elementLength = element.getElementsByTagName('a').length,
            title,
            i = 0

        finder: for (; i < elementLength; i++) {
            title = element.getElementsByTagName('a')[i]

            if (title.innerText.indexOf(text) !== -1) {
                title.style.color = 'red'
                title.style.transition = ".7s .5s"
                console.log("Color for: " + title + " is set")
                break finder
            }
        }
    }
}