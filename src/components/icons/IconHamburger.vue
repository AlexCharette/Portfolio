<template>
    <svg class="nav-btn"
         viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"
         width="100" height="100"
         fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round"
         stroke-miterlimit="1.414">
        <path ref="top" d="M726.02 132.38c0-14.01-11.374-25.384-25.384-25.384H99.364c-14.01 0-25.384 11.374-25.384 25.384v50.769c0 14.009 11.374 25.384 25.384 25.384h601.272c14.01 0 25.384-11.375 25.384-25.384V132.38z"
            fill="red" />
        <path ref="mid" d="M712.835 273.683c0-14.01-11.374-25.384-25.384-25.384H112.549c-14.01 0-25.384 11.374-25.384 25.384v50.768c0 14.01 11.374 25.384 25.384 25.384h574.902c14.01 0 25.384-11.374 25.384-25.384v-50.768z"
            fill="red" />
        <path ref="bot" d="M789.681 416.851c0-14.009-11.375-25.384-25.385-25.384H35.704c-14.01 0-25.385 11.375-25.385 25.384v50.769c0 14.01 11.375 25.384 25.385 25.384h728.592c14.01 0 25.385-11.374 25.385-25.384v-50.769z"
            fill="red" />
    </svg>
</template>

<script>
//import { hamburgerAnimation } from '@/assets/animate'

export default {
    name: 'IconHamburger',
    data: function() {
        return {
            showElements: false,
            navToggleAnimation: null
        }
    },
    methods: {
        toggle: function() {
            this.animateIcon()
            this.emitIsClicked()
            this.showElements = !this.showElements
        },
        animateIcon: function() {
            const { top, mid, bot } = this.$refs
            let animateTop = this.$anime({
                targets: top,
                rotate: 45,
                easing: 'easeInOutSine',
                autoplay: false
            })
            let animateBottom = this.$anime({
                    targets: bot,
                    rotate: -45,
                    easing: 'easeInOutSine',
                    autoplay: false
            })
            console.log(this.showElements)
            if (!this.showElements) {
                animateTop.play()
                animateBottom.play()
            } else {
                animateTop.reverse()
                animateBottom.reverse()
            }
        },
        emitIsClicked: function() {
            this.$emit('update-is-expanded')
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav-btn {
        display: block;
        position: absolute;
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
        z-index: 0;
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



