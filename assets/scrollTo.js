module.exports = (id) => {
    if (id !== !1) {
        document.getElementById(id)
            .scrollIntoView({
                  block: "center"
                , behavior: "smooth"
            })
    }
}
