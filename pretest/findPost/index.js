
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
let findPost = (ids, text) => {

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
            result = post.parentNode.id
            if (!postID.querySelector('.message')) {

                document.getElementById(result).style.color = 'red'
                break finder
            } else if (postID.querySelector('.postcontent.restore').innerText.indexOf(text) !== -1) {
                // result = post.parentNode.id
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

let userPost = (text) => {

    // let postDetails = document.querySelectorAll('.postdetails')
    //     ,postBodyLength = postDetails.length, i = 0, anchor, resultURL
    //
    // for (; i < postBodyLength; i++) {
    //     if (postDetails[i].innerText.indexOf(text) !== -1) {
    //         anchor = postDetails[i].getElementsByTagName('a')[0]
    //         // resultURL = anchor.getAttribute('href')
    //         postDetails[i].style.color = 'red'
    //         // break
    //     }
    // }
    //
    // return postDetails
    let postDetails = document.querySelectorAll('.postdetails'),
        postID,
        anchor,
        i = 0,
        themeLength = postDetails.length,
        resultUserUrl = !1

    finder:   for (; i < themeLength; i++) {
        postID = postDetails[i]

        if (postID.innerText.indexOf(text) !== -1) {

            anchor = postDetails[i].getElementsByTagName('a')[0]
            resultUserUrl = anchor.getAttribute('href')
            anchor.style.color = 'red'

            if (!postID.querySelector('.message')) {
                break finder
            } else if (postID.querySelector('.postcontent.restore').innerText.indexOf(text) !== -1) {
                break finder
            }

        }
    }
    return resultUserUrl
}

// let allIds = getId('div')

let searchStringPost = 'Не удивляйтесь'
// let searchStringPost = 'Все, проплакался от доли своей руссссской'
// let searchStringPost = 'Здравствуйте! Мы семья из 4 человек'
// let searchStringPost = 'Если никого не найдете с адресом'
// let searchStringPost = 'В какой штат планируете?'

// let searchPost = findPost(allIds, searchStringPost)
// console.log(searchPost)

let searchUserPost = userPost(searchStringPost)
console.log(searchUserPost)

