export default class Processor {
    constructor(config) {
        this.config = config
        this.utils = {}
    }

    processUtil(input) {
        let raw, negative, important, variants, parts, id

        raw = input

        input.replace(/^!-|^-!|^!|^-/, (match) => {
            negative = match != '!'
            important = match != '-'
            return ''
        })

        if (this.config.prefix) {
            if (input.startsWith(this.config.prefix))
                input = input.slice(this.config.prefix.length)
            else return
        }

        variants = input.split(this.config.variantSeparator)
        parts = variants.pop().split(this.config.separator)
        id = parts.shift()

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
