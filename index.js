export default class Processor {
    constructor(config) {
        this.config = config
        this.utils = new Map()
    }

    processUtil(className.startsWith('-')) {
            negative = true
            className = className.slice(1)
        }
        if (className.startsWith('-')) {
            negative = true
            className = className.slice(1)
        }
        if (this.config.prefix) {
            if (className.startsWith(this.config.prefix))
                className = className.slice(this.config.prefix.length)
            else return
        }
        variantNames = className.split(this.config.variantSeparator)
        pluginArgs = variantNames.pop().split(this.config.separator)
        pluginName = pluginArgs.shift()
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
            selector = variant.call(selector)
        }
    }
}
