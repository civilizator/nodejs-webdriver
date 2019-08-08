module.exports = (id) => {
    if (id !== !1) {
        console.log("Scroll To for ID: " + id)
        document.getElementById(id)
            .scrollIntoView({
                  block: "center"
                , behavior: "smooth"
            })
    }
}
