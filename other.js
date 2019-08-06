/*
let textPromise = driver.findElement(By.id("post_message_2697133")).getText();
textPromise.then((text) => {
    console.log(text);
});
*/

/*
driver.executeScript('return document.body.innerHTML')
    .then((returnValue) => {
        console.log('Return Value ->' + returnValue)
    })
*/

/*
let myFunction = () => {
        return document.body.innerHTML
    }

    driver.executeScript(myFunction)
        .then(returnValue => {
            console.log(`Return Value by myfunction -> ${returnValue}`)
        })
*/

/*
let searchText = () => {
        let text = 'Здравствуйте! У меня немного глупый, наверное, вопрос, но я никак не могу понять',
            nameID = 'post_message_2697133',
            regexp = new RegExp(text, 'i')

        if (regexp.exec(document.getElementById(nameID).innerHTML)) {

            let reg = new RegExp(text, 'g')
            document.getElementById(nameID)
                .innerHTML = document.getElementById(nameID)
                .innerHTML.replace(reg, '<span style="color: red">' + text + '</span>')

        } else {
            console.log('Текст не найден')
        }
    }

    driver.executeScript(searchText)
        .then(returnValue => {
            console.log(`Return Value by myfunction -> ${returnValue}`)
        })
*/

/*
let s = window.document.createElement('script');
s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js';
window.document.head.appendChild(s);
*/

/*
//selenium-query
$(driver).find('body')
    .then(value => console.log(value))

$(driver).find('#post_message_2697133')
    .text()
    .then(value => console.log(value))

*/

/*
await driver.findElement(By.id(`post_message_2697133`))
    .getText()
    .then(value => console.log(value))
*/

/*
//return true or false
let word = "У меня немного глупый,"
let ss = await driver.findElement(By.id(`post_message_2697133`))
    .getText()
    .then((value) => {return value.includes(word)})
*/

/*
let content = await driver.findElement(By.css(`body`))
    .getText()
    .then((value) => {return value})
let hasText = content.indexOf("глупый")!==-1;
if (hasText) {
    console.log("Hey 1 : ")
} else {
    console.log("Hey 2 : ")
}
*/

/*
let word = "У меня немного глупый,"
let searchEl = (text) =>{
    let posts = document.querySelectorAll(".postcontent.restore")

    let post, i
    outer: for (i = 0; i < posts.length; i++) {
        post = posts[i].innerText
        if (post.indexOf(text) !== -1 ) {
            posts[i].style.display = "none";
            console.log(post)
            break outer;
        }
    }
    return post
}

driver.executeScript(searchEl, word).then(returnValue => {
    console.log(`Return Value by myfunction -> ${returnValue}`)
})
*/

/*
function scrollToItem(item) {
    let diff = (item.offsetTop - window.scrollY) / 8
    if (Math.abs(diff) > 1) {
        window.scrollTo(0, (window.scrollY + diff))
        clearTimeout(window._TO)
        window._TO = setTimeout(scrollToItem, 30, item)
    } else {
        window.scrollTo(0, item.offsetTop)
    }
}

scrollToItem(document.getElementById(parentID))
*/


/*
require('chromedriver');
const { Builder } = require('selenium-webdriver');
let driver = new Builder().forBrowser('chrome').build();

(async function() {
    await driver.get('https://nodejs.org');

    //use findElements
    let links = await driver.findElements({css:'nav > ul > li > a'});
    for(let link of links) {
        text = await link.getText();
        console.log(text);
    }
    return driver.quit();
})()
*/


