class Processor {
    constructor(input, config) {
        this.input = input
        this.config = config
    }
    
    processVariants(variantNames) {
        let variantName, variant, styleSheet
        for (variantName of variantNames) {
            variant = this.config.variants[variantName]
            variant.call(this)
            if (!styleSheet.has(variantName)) styleSheet.set(variantName, new Map())
            styleSheet = styleSheet.get(variantName)
        }
    }
}
