

export const shortenSentence = (sentence: string, limit: number) => {
    
    if (!sentence || !limit) return false

    if (sentence.length > limit) {
        return sentence.substring(0, limit) + '...'
    }
    return sentence
}