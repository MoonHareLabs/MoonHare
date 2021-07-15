export default class Processor {
    constructor(config) {
        this.config = config
        this.utils = {}
    }

    processUtil(input) {
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

        plugin = this.config.plugins[pluginName]
        if(!plugin) {
            console.log(`Unsupported plugin name "${pluginName}" in "${raw}".`)
        }
        block = plugin.call({
            raw: raw,
            className: className,
            important: important,
            negative: negative,
            variants: variantNames,
            args: pluginArgs,
            get rawArgs() { return pluginArgs.join(this.config.separator) },
        })
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
