let  scrollTo = (id) => {
    if (id !== !1) {
        document.getElementById(id)
            .scrollIntoView({
                block: "center"
                , behavior: "smooth"
            })
        console.log("Hey")
    }
}

let getId = (inTag) => {
    let tags = document.getElementsByTagName(inTag),
        counter = 0,
        i = 0,
        tagsLength = tags.length,
        results = []

    for (; i < tagsLength; i++) {
        if(tags[i].id) {
            results[counter++] = tags[i].id
        }
    }

    return results
}

let checkText =  (ids, text) => {

        let foundIDs = ids,
            post,
            i = 0,
            themeLength = foundIDs.length,
            results = [!1, !1]

    finder: for (; i < themeLength; i++) {
            post = document.getElementById(foundIDs[i])

            if (post.innerText.indexOf(text) !== -1) {

                if(!post.querySelector('.message')) {
                     results = [post.querySelector('.postcontent.restore').parentNode.id, !0]
                    console.log("1 - " + post.innerText)
                    console.log("1 - " + results[0])
                    document.getElementById(results[0]).style.color = 'red'
                    break finder;
                } else if (post.querySelector('.postcontent.restore').innerText.indexOf(text) !== -1){
                    results = [post.querySelector('.postcontent.restore').parentNode.id, !0]
                    console.log("2 - " + post.querySelector('.postcontent.restore').innerText)
                    console.log("2 - " + results[0])
                    document.getElementById(results[0]).style.color = 'red'
                    break finder;
                }

                // if(post.querySelector('.message') !== null && post.querySelector('.message').innerText.indexOf(text) !== -1) {
                //     console.log(post.innerText)
                // }

            }
        }
    return results
}

let allIds = getId('div')
let searchStringPost = 'Здравствуйте! Мы сем'
// let searchStringPost = 'В какой штат планируете?'
let searchPost = checkText(allIds, searchStringPost)
console.log("RESULTS: " + searchPost)


