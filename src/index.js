class Processor {
    constructor(input, config) {
        this.input = input
        this.config = config
        this.styleSheet = new Map()
    }
    
    generate() {
        for (className of classNames) {
            this.processUtil(className)
        }
    }
    
    process(classNames) {
        let className
        for (className of classNames) {
            this.processUtil(className)
        }
        return this.generate()
    }
    
    processUtil(className) {
        let variantNames, pluginPart, styles
        variantNames = className.split(this.config.variantsSeparator)
        pluginPart = variantNames.pop()
        if (this.config.prefix) {
            if (pluginPart.startsWith(this.config.prefix)) pluginPart = pluginPart.slice(this.config.prefix.length)
            else return
        }
        styles = this.processPlugins(pluginPart, className)
        this.processVariants(variantNames, styles)
    }
    
    processVariants(variantNames, styles) {
        let variantName, variant, styleSheet
        styleSheet = this.styleSheet
        for (variantName of variantNames) {
            variant = this.config.variants[variantName]
            styles = variant.call(this, styles)
            if (!styleSheet.has(variantName)) styleSheet.set(variantName, new Map())
            styleSheet = styleSheet.get(variantName)
        }
    }

    
    processPlugins(pluginPart, className) {
        let params, pluginName, plugin
        params = pluginPart.split(this.config.separator)
        pluginName = params.shift()
        plugin = this.config.plugins[pluginName]
        if (plugin) return plugin.call(this, { params: params, raw: params.join(this.config.separator) })
        if (!this.config.skipWords) console.log(`Unsupported plugin name('${pluginName}') in '${className}'`)
    }
}
