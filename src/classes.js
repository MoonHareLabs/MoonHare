export function getNames(input) {
    return input.match(/[^<>"'`\s]*[^<>"'`\s:]/g)
}

export function getHTMLClasses(input) {
    class="((?:\\["\\]|[^"\\])*)"
}
