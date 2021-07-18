export default class Processor {
    constructor(config) {
        this.config = config
        this.utils = {}
    }

    parseUtil(input) {
        let raw, negative, important, variants, parts, id

        raw = input // -!sm:hover:mh-h-3

        input = input.replace(/^!-|^-!|^!|^-/, (match) => { // sm:hover:mh-h-3
            negative = match != '!'
            important = match != '-'
            return ''
        })

        variants = input.split(this.config.variantSeparator) // sm, hover

        parts = variants.pop().split(this.config.separator) // mh, h, 3

        id = parts.shift() // mh

        if (this.config.prefix) {
            if (id == this.config.prefix)
                id = parts.shift() // h
            else return
        }

        return {
            raw,
            negative,
            important,
            variants,
            parts,
            id
        }
    }


    extract(className) {
        let raw, negative, important, variants, utility
        raw = className // -!sm:hover:mh-h-3

        className = className.replace(/^!-|^-!|^!|^-/, (match) => { // sm:hover:mh-h-3
            negative = match != '!'
            important = match != '-'
            return ''
        })

        variants = className.split(this.config.separator) // sm, hover

        className = variants.pop()// mh-h-3
        
        className = className.replace(new RegExp(`^${this.config.prefix}`), '');

        // handle static utilities & components
        if (className in this.plugin.utilities)
            return this.plugin.utilities[className];
        else if (className in this.plugin.components)
            return this.plugin.components[className];
        else if (className in this.plugin.shortcuts)
            return this.plugin.shortcuts[className];
        
        // handle dynamic utilities
        
        utility = new Utility({ className, raw, variants, negative, important });
        for (const [key, generator] of Object.entries(processor._plugin.dynamic)) {
            if (className.match(new RegExp(`^${key}`))) {
                let style = generator(utility);
                if (style)
                    return style;
            }
        }
    }

}
