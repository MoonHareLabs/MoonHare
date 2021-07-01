CLASSRE = /\s+class\s*=\s*"((?:\\["\\]|[^"\\])*)"/gm

export function getNames(input) {
    return input.match(/[^<>"'`\s]*[^<>"'`\s:]/g)
}

export function getHTMLClasses(input) {
    let matches = [],
        match = CLASSRE.exec(input)[1];

    while (match) {
        matches.push.apply(match, match.split(/\s*|\n/))
        match = CLASSRE.exec(input)[1]
    }

    return matches
}
