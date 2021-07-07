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
            className = raw.slice(1)
        }
        variantNames = className.split(this.config.variantSeperator)
        pluginArgs = variantNames
    }
}
