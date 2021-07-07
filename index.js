export default class Processor {
    constructor(config) {
        this.config = config
    }

    processClass(raw) {
        if (raw.startsWith(this.config.important)) {
            important = true
            className = raw.slice(1)
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
    }
}
