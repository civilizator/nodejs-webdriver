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

let checkText = (ids, text) => {


        let foundIDs = ids,
            post,
            i = 0,
            themeLength = foundIDs.length,
            results = [],
            counter = 0
         for (; i < themeLength; i++) {
            post = document.getElementById(foundIDs[i])

            if (post.innerText.indexOf(text) !== -1) {

                if(!post.querySelector('.message')) {
                    console.log(post.innerText)
                    return
                } else if (post.querySelector('.postcontent.restore').innerText.indexOf(text) !== -1){
                    console.log(post.querySelector('.postcontent.restore').innerText)
                }

                // if(post.querySelector('.message') !== null && post.querySelector('.message').innerText.indexOf(text) !== -1) {
                //     console.log(post.innerText)
                // }

            }
        }
    // console.log(results)
}

let allIds = getId('div')
let searchStringPost = 'во Флориду, теперь вот'
// let searchStringPost = 'В какой штат планируете?'
let searchPost = checkText(allIds, searchStringPost)


