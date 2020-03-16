<template>
    <g :ref="name">
        <rect :x="position.x" :y="position.y"  :width="rectSize" :height="rectSize"
            :opacity="opacity" :style="styles" />
    </g>
</template>

<script>
export default {
    name: 'IconRoundedSquare',
    props: ['name', 'position', 'size', 'opacity', 'colour'],
    computed: {
        rectSize: function() {
            const minSize = 50,
                  maxSize = 250,
                  randomSize = this.size / Math.random()
            return this.getFramedValue(minSize, maxSize, randomSize)
        },
        rectRotation: function() {
            const minRotation = 35,
                  maxRotation = 65,
                  randomRotation = 100 * Math.random()
            return this.getFramedValue(minRotation, maxRotation, randomRotation)
        },
        rectDepth: function() {
            return (999 / Math.random())
        },
        styles: function() {
            return {
                fill: this.colour,
                transformOrigin: 'center',
                transform: 'rotate(' + this.rectRotation + 'deg)',
                zIndex: 999
            }
        }
    },
    methods: {
        getFramedValue: function(min, max, val) {
            if (val < min) return min
            else if (val > max) return max
            else return val
        }
    },
    mounted() {
        const travel = this.$anime({

        })
    }
}
</script>

<style lang="scss" scoped>
</style>

