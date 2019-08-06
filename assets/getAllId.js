module.exports = (inTag) => {
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