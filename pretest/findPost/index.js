let scrollTo = (id) => {
    if (id !== !1) {
        document.getElementById(id)
            .scrollIntoView({
                block: "center"
                , behavior: "smooth"
            })
        console.log("Hey")
    }
}
//todo Search all IDs in specified tags
let getId = (inTag) => {
    let tags = document.getElementsByTagName(inTag),
        counter = 0,
        i = 0,
        tagsLength = tags.length,
        results = []

    for (; i < tagsLength; i++) {
        if (tags[i].id) {
            results[counter++] = tags[i].id
        }
    }

    return results
}
//todo check text
let checkText = (ids, text) => {

    let foundIDs = ids,
        postID,
        post,
        i = 0,
        themeLength = foundIDs.length,
        result = !1

    finder:   for (; i < themeLength; i++) {
        postID = document.getElementById(foundIDs[i])

        if (postID.innerText.indexOf(text) !== -1) {

            post = postID.querySelector('.postcontent.restore')

            if (!postID.querySelector('.message')) {
                result = post.parentNode.id
                document.getElementById(result).style.color = 'red'
                break finder
            } else if (postID.querySelector('.postcontent.restore').innerText.indexOf(text) !== -1) {
                result = post.parentNode.id
                document.getElementById(result).style.color = 'red'
                break finder
            }

            // if(post.querySelector('.message') !== null && post.querySelector('.message').innerText.indexOf(text) !== -1) {
            //     console.log(post.innerText)
            // }

        }
    }
    return result
}

let allIds = getId('div')
// let searchStringPost = 'Здравствуйте! Мы семья из 4 человек'
let searchStringPost = 'В какой штат планируете?'
let searchPost = checkText(allIds, searchStringPost)
console.log(searchPost)


