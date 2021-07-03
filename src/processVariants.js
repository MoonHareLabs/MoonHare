function process() {
    let varaintNames, pluginPart, styleSheet, varaintName, variant, pluginArgs
    varaintNames = className.split(config.variantsSeparator)
    pluginPart = varaintNames.pop()
    if (config.prefix) {
        if (pluginPart.startsWith(config.prefix)) pluginPart = pluginPart.slice(config.prefix.length)
        else return
    }
    pluginArgs = pluginPart.split(config.separator)
    pluginName = pluginPart.shift()
    styles = config.plugins[pluginName](pluginArgs)
    
    for (varaintName of varaintNames) {
        variant = config.variants[varaintName]
        variant.call()
        if (!styleSheet.has(varaintName)) styleSheet.set(varaintName, new Map())
        styleSheet = styleSheet.get(varaintName)
    }
}
