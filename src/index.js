export default class Processor {
    constructor(config) {
        this.config = config
        this.utils = {}
    }

    parseUtil(input) {
        let raw, negative, important, variants, parts, id

        raw = input // -!sm:hover:mh-h-3

        input.replace(/^!-|^-!|^!|^-/, (match) => { // sm:hover:mh-h-3
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

        return {raw, negative, important, variants, parts, id}
    }

    interpretclassName(className) {
        if (this.excluded(className)) {
            return
        }
        util = parseUtil(className)
        plugin = this.config.plugins[util.id]
        if(!plugin) {
            console.log(`Unsupported plugin name "${pluginName}" in "${raw}".`)
            return
        }
        plugin.call(util)
        for (variant in variants) {
            variantF = this.variants[variant]
            if (!variant) {
                console.log(`Unsupported variant name "${variant}" in "${raw}".`)
                return
            }
            if (!utils[variant]) utils[variant] = {}
        }
    }
    
    interpret(classNames, ignoreProcessed, handleIgnored) {
        
        for (variantName in variantNames) {
            variant = this.variants[variantName]
            if (!variant) {
                console.log(`Unsupported variant name "${variantName}" in "${raw}".`)
                return
            }
            utils = utils[variantName] || {}
            if (!utils) utils[variantName] = utils
            selector = variant.call(selector)
        }
    }
}
