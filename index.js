const {Builder, By, Key, until, Capabilities, promise} = require('selenium-webdriver')

const {findTheme, getId} = require('./assets')


const data = require('./middlewares')


let url =
     'http://127.0.0.1:8080'
    //,'https://www.govorimpro.us/%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0-%D0%B2-%D1%81%D1%88%D0%B0/36516-utest-2071.html'
    //'https://www.govorimpro.us/%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D1%8E-%D0%BA-%D0%B4%D0%B5%D0%B4%D1%83%D1%88%D0%BA%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%BD%D0%B5%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B8%D0%B2%D1%88%D0%B8%D1%85%D1%81%D1%8F-%D0%BA%D1%83%D0%B4%D0%B0-%D0%B5%D1%85%D0%B0%D1%82%D1%8C/52591-%D0%B8%D1%89%D0%B5%D0%BC-%D0%BB%D1%8E%D0%B4%D0%B5%D0%B9-%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D1%8B%D1%85-%D0%BF%D0%BE%D0%BC%D0%BE%D1%87%D1%8C-%D0%B2-%D0%BE%D0%B1%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%82%D0%B2%D0%B5-%D0%B2-%D1%81%D1%88%D0%B0.html'

let chromeOptions = {
    'args': [
          '--test-type'
        , '--incognito'
        , '--start-maximized'
    ]
}

let chromeCapabilities = Capabilities
    .chrome()
    .set('chromeOptions', chromeOptions)

let driver = new Builder()
    .withCapabilities(chromeCapabilities)
    .build()

driver.get(url).then( async()=> {

    let sigIn = async (login, passwoerd) => {
        await driver.findElement(By.css(`input[name='vb_login_username']`)).sendKeys(login)
        await driver.findElement(By.css(`input[name='vb_login_password_hint']`)).click()
        await driver.findElement(By.css(`input[name='vb_login_password']`)).sendKeys(passwoerd)
        await driver.findElement(By.css(`input[value='Вход']`)).click()
    }

    let inbox = async () => {
        await driver
            .wait(until.elementLocated(By.id('yui-gen1')), 7000)
            .then(el => {
                el.click()
            })
        await driver.findElement(By.xpath(`//a[text()='Входящие']`)).click()
    }

    let advancedSearch = async () => {
        await driver.findElement(By.xpath("//a[text()='Расширенный поиск']")).click()
        await driver.findElement(By.css(`input[name='query']`)).sendKeys('Utest')
        await driver.findElement(By.css(`input[name='dosearch']`)).click()

        // await driver.findElement(By.xpath("//a[text()='Utest']")).click()
        // await driver.findElement(By.xpath("//a[text()='Последняя']")).click()
    }



    let s = 'В мою контору опять требуется тостер, расширяемся чо'
    let c = 'Здравствуйте! У меня немного глупый, наверное, вопрос, но я никак не могу понять'
    let s2 = "У меня немного глупый,"

    let searchText = (word) => {

        let searchEl = (text) => {
            let posts = document.querySelectorAll('.postcontent.restore'),
                post, i, parentID

            finder: for (i = 0; i < posts.length; i++) {
                post = posts[i].innerText
                if (post.indexOf(text) !== -1) {
                    posts[i].style.color = 'red'
                    posts[i].style.transition = "1s 1.2s"
                    console.log(`TEXT: ${post}`)
                    parentID = posts[i].parentNode.id
                    break finder;
                }
            }

            document.getElementById(parentID)
                .scrollIntoView({
                    block: "center"
                    , behavior: "smooth"
                })
            return [post, parentID]
        }

        driver.executeScript(searchEl, word).then(returnValue => {
            console.log(`Return Value by myfunction -> ${returnValue}`)
        })
    }




    // await sigIn(data.login, data.password)
    // await inbox()
    // await advancedSearch()
    // await searchText(s2)

    let querySelectorsForTheme = '.icon0.rating0.nonsticky'
    let themeText = 'Даллас'

    let scrollTo = (id) => {
        if (id !==  !1) {
            document.getElementById(id)
                .scrollIntoView({
                    block: "center"
                    , behavior: "smooth"
                })
        }
    }

    let result = await driver.executeScript(findTheme, querySelectorsForTheme, themeText)

    console.log(result)

    await driver.executeScript(scrollTo, result[0])


    console.log(await driver.executeScript(getId, 'li'))


})


