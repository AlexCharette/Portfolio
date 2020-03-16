<<<<<<< HEAD
<template>
    <div class="svg-wrapper">
        <div ref="left" class="icon-node"></div>
        <div ref="mid" class="icon-node"></div>
        <div ref="right" class="icon-node"></div>
        <svg class="nav-btn" viewBox="0 0 204 321" xmlns="http://www.w3.org/2000/svg"
            width="204" height="321">
            <path id="left-path" ref="midPath" d="M57.363 61.209c-21.776 88.769 11.772 193.342 99.048 193.411" stroke="#DE1018" stroke-width="2.92px" fill="none" />
            <path id="mid-path" ref="leftPath" d="M106.388 110.233c-.351 39.429 18.981 53.627 50.023 53.599" stroke="#DE1018" stroke-width="2.92px" fill="none" />
        </svg>
    </div>
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
            let animationLeft = this.navToggleAnimation.animateLeft,
                animationMid = this.navToggleAnimation.animateMid
            if (animationState == 'reverse' || animationState == 'clicked') {
                if (!animationMid.reversed) {
                    animationMid.reverse()
                    animationLeft.reverse()
                }
                animationMid.play()
                animationLeft.play()
            } else if (animationState == 'forward') {
                console.log('forward!')
                if (animationMid.reversed) {
                    animationMid.reverse()
                    animationLeft.reverse()
                }
                animationMid.play()
                animationLeft.play()
            }
            EventBus.$emit('dots-animation-complete')
        }
    },
    created() {

    },
    mounted() {
        const { left, mid, leftPath, midPath } = this.$refs
        var animLeftPath = this.$anime.path('#left-path')
        var animMidPath = this.$anime.path('#mid-path')

        this.navToggleAnimation = {
            animateLeft: this.$anime({
                targets: left,
                translateX: animLeftPath('x'),
                translateY: animLeftPath('y'),
                easing: 'linear',
                autoplay: false
            }),
            animateMid: this.$anime({
                targets: mid,
                translateX: animMidPath('x'),
                translateY: animMidPath('y'),
                easing: 'linear',
                autoplay: false
            })
        }
        let animationFunction = this.animateIcon
        EventBus.$on('animate-icon', function(msg) {
            animationFunction(msg)
        })
    }
}
</script>

<style lang="scss" scoped>
    .svg-wrapper {
        position: absolute;
        margin-top: 10em;
        min-width: 204px;
        height: 100%;
        min-height: 321px;
        .icon-node {
            position: absolute;
            top: -9px;
            left: -9px;
            width: 3rem;
            height: 3rem;
            //transform: rotate(45deg) !important;
            background-color: #51a7c5;
            opacity: 0.5;
            border-radius: 3em;
            //border: 2px solid #73AD21;
            &:nth-of-type(3) {
                // top: 3.5em;
                // left: 10em;
                transform: translate(155.413px, 61.209px);
            }
        }
        .nav-btn {
            position: absolute;
            top: 0;
            left: 0;
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
    }
=======
<template>
    <div class="svg-wrapper">
        <div ref="left" class="icon-node"></div>
        <div ref="mid" class="icon-node"></div>
        <div ref="right" class="icon-node"></div>
        <svg class="nav-btn" viewBox="0 0 204 321" xmlns="http://www.w3.org/2000/svg"
            width="204" height="321">
            <path id="left-path" ref="midPath" d="M57.363 61.209c-21.776 88.769 11.772 193.342 99.048 193.411" stroke="#DE1018" stroke-width="2.92px" fill="none" />
            <path id="mid-path" ref="leftPath" d="M106.388 110.233c-.351 39.429 18.981 53.627 50.023 53.599" stroke="#DE1018" stroke-width="2.92px" fill="none" />
        </svg>
    </div>
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
            let animationLeft = this.navToggleAnimation.animateLeft,
                animationMid = this.navToggleAnimation.animateMid
            if (animationState == 'reverse' || animationState == 'clicked') {
                if (!animationMid.reversed) {
                    animationMid.reverse()
                    animationLeft.reverse()
                }
                animationMid.play()
                animationLeft.play()
            } else if (animationState == 'forward') {
                console.log('forward!')
                if (animationMid.reversed) {
                    animationMid.reverse()
                    animationLeft.reverse()
                }
                animationMid.play()
                animationLeft.play()
            }
            EventBus.$emit('dots-animation-complete')
        }
    },
    created() {

    },
    mounted() {
        const { left, mid, leftPath, midPath } = this.$refs
        var animLeftPath = this.$anime.path('#left-path')
        var animMidPath = this.$anime.path('#mid-path')

        this.navToggleAnimation = {
            animateLeft: this.$anime({
                targets: left,
                translateX: animLeftPath('x'),
                translateY: animLeftPath('y'),
                easing: 'linear',
                autoplay: false
            }),
            animateMid: this.$anime({
                targets: mid,
                translateX: animMidPath('x'),
                translateY: animMidPath('y'),
                easing: 'linear',
                autoplay: false
            })
        }
        let animationFunction = this.animateIcon
        EventBus.$on('animate-icon', function(msg) {
            animationFunction(msg)
        })
    }
}
</script>

<style lang="scss" scoped>
    .svg-wrapper {
        position: absolute;
        margin-top: 10em;
        min-width: 204px;
        height: 100%;
        min-height: 321px;
        .icon-node {
            position: absolute;
            top: -9px;
            left: -9px;
            width: 3rem;
            height: 3rem;
            //transform: rotate(45deg) !important;
            background-color: #51a7c5;
            opacity: 0.5;
            border-radius: 3em;
            //border: 2px solid #73AD21;
            &:nth-of-type(3) {
                // top: 3.5em;
                // left: 10em;
                transform: translate(155.413px, 61.209px);
            }
        }
        .nav-btn {
            position: absolute;
            top: 0;
            left: 0;
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
    }
>>>>>>> 37d16293c0a0af7383dd9aa7fef12f8653a8ee8c
</style>