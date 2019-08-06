


/*
let querySelectorsForTheme = '.icon0.rating0.nonsticky'
let themeText = 'Даллас-моя история'
findTheme, querySelectorsForTheme, themeText
*/

module.exports = (querySelectors, text) => {
    let theme = document.querySelectorAll(querySelectors),
        title, i, results = [!1, !1]

    finder: for (i = 0; i < theme.length; i++) {
        title = theme[i].querySelector('.title').innerText
        if (title.indexOf(text) !== -1) {
            theme[i].style.color = 'red'
            results[0] = theme[i].parentNode.id
            results[1] = true
            break finder;
        }
    }
    return results
}