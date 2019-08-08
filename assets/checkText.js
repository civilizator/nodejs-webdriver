module.exports = (ids, text) => {

    let foundIDs = ids,
        title,
        i = 0,
        themeLength = foundIDs.length,
        result = !1

    finder: for (; i < themeLength; i++) {
        title = document.getElementById(foundIDs[i])

        if (title.innerText.indexOf(text) !== -1) {
            result = title.id
            break finder;
        }
    }
    return result
}
