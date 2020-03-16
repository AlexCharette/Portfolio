<<<<<<< HEAD
<template>
    <svg class="nav-btn"
         viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"
         width="100" height="100"
         fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round"
         stroke-miterlimit="1.414">
        <path id="top" ref="top" :d="topPath"
            fill="red" />
        <path id="mid" ref="mid" :d="midPath"
            fill="red" />
        <path id="bot" ref="bot" :d="botPath"
            fill="red" />
    </svg>
</template>

<script>
import EventBus from '../../event-bus'

export default {
    name: 'IconHamburger',
    data: function() {
        return {
            navToggleAnimation: null,
            topPath: 'M726.02 132.38c0-14.01-11.374-25.384-25.384-25.384H99.364c-14.01 0-25.384 11.374-25.384 25.384v50.769c0 14.009 11.374 25.384 25.384 25.384h601.272c14.01 0 25.384-11.375 25.384-25.384V132.38z',
            midPath: 'M712.835 273.683c0-14.01-11.374-25.384-25.384-25.384H112.549c-14.01 0-25.384 11.374-25.384 25.384v50.768c0 14.01 11.374 25.384 25.384 25.384h574.902c14.01 0 25.384-11.374 25.384-25.384v-50.768z',
            botPath: 'M789.681 416.851c0-14.009-11.375-25.384-25.385-25.384H35.704c-14.01 0-25.385 11.375-25.385 25.384v50.769c0 14.01 11.375 25.384 25.385 25.384h728.592c14.01 0 25.385-11.374 25.385-25.384v-50.769z',
            paths: []
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
        const { top, mid, bot } = this.$refs
        this.paths = [
            { id: 'top', d: this.topPath },
            { id: 'mid', d: this.midPath },
            { id: 'bot', d: this.botPath }
        ]
        //console.log("Icon mounted")
        this.navToggleAnimation = {
            animateTop: this.$anime({
                targets: top,
                rotate: 45,
                easing: 'easeInOutSine',
                autoplay: false
            }),
            animateBottom: this.$anime({
                    targets: bot,
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



=======
<template>
    <svg class="nav-btn"
         viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"
         width="100" height="100"
         fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round"
         stroke-miterlimit="1.414">
        <path id="top" ref="top" :d="topPath"
            fill="red" />
        <path id="mid" ref="mid" :d="midPath"
            fill="red" />
        <path id="bot" ref="bot" :d="botPath"
            fill="red" />
    </svg>
</template>

<script>
import EventBus from '../../event-bus'

export default {
    name: 'IconHamburger',
    data: function() {
        return {
            navToggleAnimation: null,
            topPath: 'M726.02 132.38c0-14.01-11.374-25.384-25.384-25.384H99.364c-14.01 0-25.384 11.374-25.384 25.384v50.769c0 14.009 11.374 25.384 25.384 25.384h601.272c14.01 0 25.384-11.375 25.384-25.384V132.38z',
            midPath: 'M712.835 273.683c0-14.01-11.374-25.384-25.384-25.384H112.549c-14.01 0-25.384 11.374-25.384 25.384v50.768c0 14.01 11.374 25.384 25.384 25.384h574.902c14.01 0 25.384-11.374 25.384-25.384v-50.768z',
            botPath: 'M789.681 416.851c0-14.009-11.375-25.384-25.385-25.384H35.704c-14.01 0-25.385 11.375-25.385 25.384v50.769c0 14.01 11.375 25.384 25.385 25.384h728.592c14.01 0 25.385-11.374 25.385-25.384v-50.769z',
            paths: []
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
        const { top, mid, bot } = this.$refs
        this.paths = [
            { id: 'top', d: this.topPath },
            { id: 'mid', d: this.midPath },
            { id: 'bot', d: this.botPath }
        ]
        //console.log("Icon mounted")
        this.navToggleAnimation = {
            animateTop: this.$anime({
                targets: top,
                rotate: 45,
                easing: 'easeInOutSine',
                autoplay: false
            }),
            animateBottom: this.$anime({
                    targets: bot,
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



>>>>>>> 37d16293c0a0af7383dd9aa7fef12f8653a8ee8c
