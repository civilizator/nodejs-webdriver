require('chromedriver')
const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver')

const {getId, checkText, findPost, scrollTo, setColorFound, setColorForID, searchInSearch, searchUserByText} = require('./assets')
const data = require('./middlewares')

let url = 'url'

let capabilities = {
      'browserName': 'chrome'
    , 'chromeOptions': {
          'args': [
              '--test-type'
            , '--incognito'
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
        let getPostID
        // await driver.wait(until.elementLocated(By.xpath(`//div[text()='${text}']`)), 10000)
        await driver.wait(until.elementLocated(By.className('postcontent restore')), 10000)
            .then( async () => {
                let allIds = await driver.executeScript(getId, 'div')
                getPostID = await driver.executeScript(findPost, allIds, text)
                await driver.executeScript(scrollTo, getPostID)
                await driver.executeScript(setColorForID, getPostID)
            } )
        return getPostID
    }

    let searchInTheme = async (text) => {
        await driver.wait(until.elementLocated(By.xpath(`//a[text()='Поиск по теме']`)), 10000).click()
        await driver.findElement(By.css(`input[name='query']`)).sendKeys(text)
        await driver.findElement(By.css(`input[value='Поиск']`)).click()
        return text
    }

    let clickAnchor = async (textAnchor, timeWait) => {
        await driver.wait(until.elementLocated(By.xpath(`//a[text()='${textAnchor}']`)), timeWait).click()
    }

    let sendPrivateMessage = async (title, message) => {

        await driver.wait(until.elementLocated(By.xpath(`//a[contains(text(), 'Отправить личное сообщение')]`)), 10000).click()
        await driver.findElement(By.css(`input[name='title']`)).sendKeys(title)
        await driver.findElement(By.css(`textarea[role='textbox']`)).sendKeys(message)
        await driver.findElement(By.css(`input[name='preview']`))
            .then(async (element) => {
                await driver.executeScript(`arguments[0].scrollIntoView({behavior: 'smooth'})`, element)
                await driver.sleep(500)
                await element.click()
            })
        await driver.sleep(2000)
        await driver.findElement(By.css(`input[name='sbutton']`))
            .then(async (element) => {
                await driver.executeScript(`arguments[0].scrollIntoView({behavior: 'smooth'})`, element)
                await driver.sleep(1000)
                await element.click()
            })
    }

    //todo Sign In to Account
    await signIn(data.login, data.password)

   //todo Use Advanced Search
    let theme = 'Utest'
    await advancedSearch(theme)
        .then(async (returnText)=>{
            await checkFoundTextTheme(returnText)
            return returnText
        }).then(async (returnText) => {await clickAnchor(returnText, 5000)})

    // await clickAnchor('Последняя')

    //todo Search Text in Theme
    let searchTextInTheme = 'В мою контору опять требуется тостер, расширяемся чо'
    let searchTextTheme = await searchInTheme(searchTextInTheme)


    //todo Search in Found
    let searchInFound = await driver.executeScript(searchInSearch, searchTextInTheme)
    await driver.wait(until.elementLocated(By.css(`[href^="${searchInFound}"]`)), 2000).click()

    //todo Go to Inbox
    // await inbox()

    //todo Search Post in Theme
    let getPost = await searchPost(searchTextInTheme)

    //todo Go to User Profile
    let searchUser = await driver.executeScript(searchUserByText, searchTextTheme)
    let urlUs = await driver.wait(until.elementLocated(By.css(`[href^="${searchUser}"]`)), 2000).click()
    await driver.get(searchUser)

    //todo Send Private Message and Fill Fields Message

    let title = 'This Test. Do something or write',
        message = 'Привет Aleks! \n' +
            'Я приложил видео :) \n' +
            '[URL="http://drive.google.com/open?id=1RpfOVSjZhuMdygktn82ESGAt0l0OT8W1"]http://drive.google.com/open?id=1RpfOVSjZhuMdygktn82ESGAt0l0OT8W1[/URL]'


    await sendPrivateMessage(title, message)

    console.log("Bye Aleks )))))))))))")
}).then(() => {
    driver.sleep(2000)
    driver.quit();
})


