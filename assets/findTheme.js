


/*
let querySelectorsForTheme = '.icon0.rating0.nonsticky'
let themeText = 'Даллас-моя история'
findTheme, querySelectorsForTheme, themeText
*/

module.exports = (querySelectors, text) => {
    let theme = document.querySelectorAll(querySelectors),
        title, i, parentID, mark = false

    finder: for (i = 0; i < theme.length; i++) {
        title = theme[i].querySelector('.title').innerText
        if (title.indexOf(text) !== -1) {
            theme[i].style.color = 'red'
            console.log(`TEXT: ${title}`)
            parentID = theme[i].parentNode.id
            mark = true
            break finder;
        }
    }
    // document.getElementById(parentID)
    //     .scrollIntoView({
    //         block: "center"
    //         , behavior: "smooth"
    //     })
    return [parentID, mark]
}