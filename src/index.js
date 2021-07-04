class Processor {
    constructor(input, config) {
        this.input = input
        this.config = config
    }
    
    processUtil(className) {
        let varaintNames, pluginPart, styles
        varaintNames = className.split(this.config.variantsSeparator)
        pluginPart = varaintNames.pop()
        if (this.config.prefix) {
            if (pluginPart.startsWith(this.config.prefix)) pluginPart = pluginPart.slice(this.config.prefix.length)
            else return
        }
        styles = this.processPlugins(pluginPart, className)
        
    }
    
    processVariants(variantNames, styles) {
        let variantName, variant, styleSheet
        for (variantName of variantNames) {
            variant = this.config.variants[variantName]
            variant.call(this)
            if (!styleSheet.has(variantName)) styleSheet.set(variantName, new Map())
            styleSheet = styleSheet.get(variantName)
        }
    }

    
    processPlugins(pluginPart, className) {
        let params, pluginName, plugin
        params = pluginPart.split(this.config.separator)
        pluginName = pluginPart.shift()
        plugin = this.config.plugins[pluginName]
        if (plugin) return plugin.call(this, { params: params, raw: params.join(this.config.separator) })
        if (!this.config.skipWords) console.log(`Unsupported plugin name('${pluginName}') in '${className}'`)
    }
}
