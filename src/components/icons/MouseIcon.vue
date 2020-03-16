<template>
    <div class="scroll-icon-mouse" key="scroll-icon-mouse">
        <div class="scroll-icon-wheel" key="scroll-icon-wheel"
            :style="{ opacity: 0 }"></div>
    </div>
</template>

<script>
import EventBus from '../../event-bus'

export default {
    name: 'MouseIcon',
    data: function() {
        return {
            mouseIconTimeline: null
        }
    },
    methods: {
        initMouseIconAnimations: function() {
            this.mouseIconTimeline = this.$anime.timeline({
                loop: true,
                autoplay: true
            })
            this.mouseIconTimeline
            .add({
                targets: '.scroll-icon-wheel',
                opacity: 1,
                translateY: 15,
                easing: 'easeInOutCubic',
                duration: 1000
            })
        },
        swapMousePosition: function(direction) {
            const downMovement = 5,
                  upMovement = -(window.innerHeight / 1.3) + 30,
                  translateY = (direction == 'up') ? downMovement : upMovement
            this.$anime({
                targets: '.scroll-icon-mouse',
                opacity: 0,
                translateY,
                easing: 'easeInOutCubic',
                duration: 750,
                autoplay: true
            })
        },
        reappearMouse: function() {
            console.log("Reappearing!")
            this.$anime({
                targets: '.scroll-icon-mouse',
                opacity: 1,
                easing: 'easeInOutCubic',
                duration: 750,
                autoplay: true,
                loop: false
            })
        }
    },
    mounted() {
        this.initMouseIconAnimations()
        const state = this
        EventBus.$on('displace-mouse-icon', direction => {
            state.swapMousePosition(direction)
        })
        EventBus.$on('project-bounds-reached', direction => {
            state.reappearMouse()
            const opposite = (direction == 'up') ? 'down' : 'up'
            state.swapMousePosition(direction)
        })
    }
}
</script>

<style lang="scss" scoped>
    .scroll-icon-mouse {
        margin: 0 auto;
        margin-top: 12em;
        width: 3px;
        padding: 10px 15px;
        height: 35px;
        border: 2px solid $charcoal;
        border-radius: 25px;
        opacity: 0.75;
        box-sizing: content-box;
        .scroll-icon-wheel {
            width: 3px;
            height: 10px;
            border-radius: 25%;
            background-color: $charcoal;
        }
    }
</style>
