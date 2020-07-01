declare module "@txo/functional" {
    function onlyOne<TYPE>(list: TYPE[]): TYPE    
    function atMostOne<TYPE>(list: TYPE[]): TYPE | null
}
