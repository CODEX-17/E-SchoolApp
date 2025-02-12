

export const shortenSentence = (sentence, limit) => {
    
    if (!sentence || !limit) return false

    if (sentence.length > limit) {
        return sentence.substring(0, limit) + '...'
    }
    return sentence
}