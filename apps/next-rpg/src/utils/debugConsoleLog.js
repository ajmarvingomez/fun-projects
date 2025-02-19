export function debugConsoleLog(variable) {
    const debug = process.env.NODE_ENV === "development" ? true : false
    if(debug === true) {
        console.log(variable)
    }

}