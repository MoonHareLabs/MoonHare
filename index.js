export default class Processor {
    constructor(config) {
        this.config = config
    }

    processClass(className) {
        variantNames = className.split(this.config.variantSeperator)
        pluginArgs = variantNames
    }
}
