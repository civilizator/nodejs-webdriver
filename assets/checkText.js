module.exports = (ids, text) => {

    let foundIDs = ids,
        title,
        i = 0,
        themeLength = foundIDs.length,
        results = [!1, !1]

    finder: for (; i < themeLength; i++) {
        title = document.getElementById(foundIDs[i])

        if (title.innerText.indexOf(text) !== -1) {
            results[0] = title.id
            results[1] = true
            break finder;
        }
    }
    return results
}
