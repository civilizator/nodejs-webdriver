require('chromedriver')
const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver')

const {getId, checkText, findPost, scrollTo, setColorFound, setColorForID} = require('./assets')
const data = require('./middlewares')

let url =
    //'https://www.govorimpro.us/'
    //,'http://127.0.0.1:8080'
    //,'https://www.govorimpro.us/%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0-%D0%B2-%D1%81%D1%88%D0%B0/36516-utest-2071.html'
    'https://www.govorimpro.us/%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D1%8E-%D0%BA-%D0%B4%D0%B5%D0%B4%D1%83%D1%88%D0%BA%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%BD%D0%B5%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B8%D0%B2%D1%88%D0%B8%D1%85%D1%81%D1%8F-%D0%BA%D1%83%D0%B4%D0%B0-%D0%B5%D1%85%D0%B0%D1%82%D1%8C/52591-%D0%B8%D1%89%D0%B5%D0%BC-%D0%BB%D1%8E%D0%B4%D0%B5%D0%B9-%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D1%8B%D1%85-%D0%BF%D0%BE%D0%BC%D0%BE%D1%87%D1%8C-%D0%B2-%D0%BE%D0%B1%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%82%D0%B2%D0%B5-%D0%B2-%D1%81%D1%88%D0%B0.html'

let capabilities = {
      'browserName': 'chrome'
    , 'chromeOptions': {
        'args': [
            '--test-type'
            , '--incognito'
            //, '--start-maximized' //option not worked in new version chromedriver
        ]
    }
}

let driver = new Builder()
    .withCapabilities(capabilities)
    .build()

driver.manage().window().maximize()

driver.get(url).then( async()=> {

    let signIn = async (login, password) => {
        await driver.findElement(By.css(`input[name='vb_login_username']`)).sendKeys(login)
        await driver.findElement(By.css(`input[name='vb_login_password_hint']`)).click()
        await driver.findElement(By.css(`input[name='vb_login_password']`)).sendKeys(password)
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


    let advancedSearch = async (text) => {

        await driver.wait(until.elementLocated(By.xpath(`//a[text()='Расширенный поиск']`)), 10000)
            .then( element => element.click() )

        await driver.wait(until.elementLocated(By.css(`input[name='query']`)), 10000)
            .then( async element => {
                await driver.executeScript(`arguments[0].scrollIntoView({block: "center", behavior: "smooth"})`, element)
                await driver.sleep(300)
                await element.click()
                await driver.sleep(100)
                await element.sendKeys(text)
            })

        await driver.wait(until.elementLocated(By.xpath(`//select[@name='titleonly']`)), 5000)
            .then( async element => {
                await element.sendKeys(Key.ENTER)
                await driver.sleep(100)
                await element.sendKeys(Key.DOWN)
                await driver.sleep(100)
                await element.sendKeys(Key.ENTER)
            })

        await driver.wait(until.elementLocated(By.xpath(`//select[@name='searchdate']`)), 5000)
            .then( async element => {
                await driver.sleep(300)
                await driver.executeScript(`arguments[0].scrollIntoView({block: "center", behavior: "smooth"})`, element)
                await element.sendKeys(Key.ENTER)
                await driver.sleep(100)
                await element.sendKeys(Key.DOWN)
                await driver.sleep(100)
                await element.sendKeys(Key.DOWN)
                await driver.sleep(100)
                await element.sendKeys(Key.DOWN)
                await driver.sleep(100)
                await element.sendKeys(Key.ENTER)
            })

        await driver.findElement(By.css(`input[name='dosearch']`)).click()
        return text
    }

    let checkFoundTextTheme = async (text) => {
        let allId = await driver.executeScript(getId, 'li'),
            searchString = text,
            foundText = await driver.executeScript(checkText, allId, searchString)
        await driver.executeScript(scrollTo, foundText)
        await driver.executeScript(setColorFound, foundText, searchString)

    }

    let searchPost = async (text) => {
        await driver.wait(until.elementLocated(By.xpath(`//div[text()='${text}']`)), 10000)
            .then( async () => {
                let allIds = await driver.executeScript(getId, 'div')
                let getPostID = await driver.executeScript(findPost, allIds, text)
                await driver.executeScript(scrollTo, getPostID)
                await driver.executeScript(setColorForID, getPostID)
            } )
    }


    await signIn(data.login, data.password)

    let theme = 'Utest'
    await advancedSearch(theme)
        .then(async (returnText)=>{
            await checkFoundTextTheme(returnText)
            return returnText
        }).then(async (returnText) => {await driver.findElement(By.xpath(`//a[text()='${returnText}']`)).click()})

    // await inbox()
    // await checkFoundTextTheme('Utest')
    // await searchPost('В какой штат планируете?')

})
//     .then(() => {
//     driver.sleep(2000)
//     driver.quit();
// })


