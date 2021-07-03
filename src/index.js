class Processor {
    constructor(input, config) {
        this.input = input
        this.config = config
    }
    
    processVariants(variantNames, code) {
        let variantName, variant, styleSheet
        for (variantName of variantNames) {
            variant = this.config.variants[variantName]
            variant.call(this)
            if (!styleSheet.has(variantName)) styleSheet.set(variantName, new Map())
            styleSheet = styleSheet.get(variantName)
        }
    }

    
    processPlugins(pluginPart, className) {
        let pluginArgs, pluginName, plugin
        pluginArgs = pluginPart.split(this.config.separator)
        pluginName = pluginPart.shift()
        plugin = this.config.plugins[pluginName]
        if (plugin) return plugin(pluginArgs)
        if (!this.config.skipWords) console.log(`Unsupported plugin name('${pluginName}') in '${className}'`)
    }
}
