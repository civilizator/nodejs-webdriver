module.exports = (ids, text) => {

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
                break finder
            } else if (postID.querySelector('.postcontent.restore').innerText.indexOf(text) !== -1) {
                result = post.parentNode.id
                break finder
            }

        }
    }
    return result
}
