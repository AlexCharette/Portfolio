<template>
    <svg class="nav-btn"
         viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg"
         width="200" height="50"
         fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round"
         stroke-miterlimit="1.414">
        <circle ref="left" cx="135.217" cy="300" r="115.841" fill="#C4362A" />
        <circle ref="mid" cx="405.262" cy="300" r="115.841" fill="#C4362A" />
        <circle ref="right" cx="668.862" cy="300" r="115.841" fill="#C4362A" />
    </svg>
</template>

<script>
import EventBus from '../../event-bus'

export default {
    name: 'IconThreeDots',
    data: function() {
        return {
            navToggleAnimation: null
        }
    },
    methods: {
        animateIcon: function(animationState) {
            let animationTop = this.navToggleAnimation.animateTop
            let animationBot = this.navToggleAnimation.animateBottom
            if (animationState == 'reverse' || animationState == 'clicked') {
                if (!animationTop.reversed) {
                    animationTop.reverse()
                    animationBot.reverse()
                }
                animationTop.play()
                animationBot.play()
            } else if (animationState == 'forward') {
                if (animationTop.reversed) {
                    animationTop.reverse()
                    animationBot.reverse()
                }
                animationTop.play()
                animationBot.play()
            }
        }
    },
    mounted() {
        const { left, mid, right } = this.$refs
        this.navToggleAnimation = {
            animateTop: this.$anime({
                targets: left,
                rotate: 45,
                easing: 'easeInOutSine',
                autoplay: false
            }),
            animateBottom: this.$anime({
                    targets: right,
                    rotate: -45,
                    easing: 'easeInOutSine',
                    autoplay: false
            })
        }
        let animationFunction = this.animateIcon
        EventBus.$on('animate-icon', function(msg) {
            //console.log('Message received: ' + msg)
            animationFunction(msg)
        })
    }
}
</script>

<style lang="scss" scoped>
    .nav-btn {
        display: block;
        position: absolute;
        transform-origin: center;
        //align-content: center;
        //justify-content: center;
        // margin: 0 auto;
        //margin-top: 120px;
        // top: 0;
        // right: 0;
        // left: 0;
        // bottom: 0;
        // min-height: 44px;
        // min-width: 44px;
        z-index: -1;
        @include mobile {
            display: block !important;
            position: fixed;
            bottom: 0px;
            right: 0px;
            margin-right: 1rem;
            margin-bottom: 1rem;
            min-width: 44px;
            min-height: 44px;
            z-index: 999;
        }
    }
</style>