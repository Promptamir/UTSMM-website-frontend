// Creating and exporting handle Fetch Error function as default
export default function HandleFetchError({data, callbackError, callbackSuccess, lineBreak = false}) {
    if (data.message === "Unauthenticated.") {callbackError(data.message)}
    else if (data.message === "Unprocessable entity") {
        if (!lineBreak) {
            callbackError(Object.values(data.errors).map((item, index) => {
                return `${Object.keys(data.errors)[index]} : ${item.join('&')}`
            }).join(' & '))
        } else {
            callbackError(Object.values(data.errors).map((item, index) => {
                return `${Object.keys(data.errors)[index]} : ${item.join('&')}`
            }).join(' & ').replace(/&/g, '<br />'))
        }
    }
    else if (data.message === "Too many requests. Please try again later") {callbackError(data.message)}
    else if (data.message === "Internal server error") {callbackError(data.message)}
    else if (data.message === "This question has already been answered") {callbackError(data.message)}
    else {callbackSuccess(data.message)}
}