module.exports = (inTag) => {
    let tag = document.getElementsByTagName(inTag)
        ,elements = document.getElementsByTagName(inTag)
        ,count = 0, i = 0, elementsLength = elements.length ,results = []

    for (; i < elementsLength; i++) {
        if(elements[i].id) {
            results[count++] = elements[i].id
        }
    }

    return count
}