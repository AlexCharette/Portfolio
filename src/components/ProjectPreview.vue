<template>
    <transition-group name="expand" tag="div"
        :class="[{ active: isActive }, 'preview-wrapper']"
        :css="false" mode="out-in">
        <!-- <div key="exit-btn" ref="exit"
            id="exit-proj-button" class="button"
            @click="$emit('update-expanded-status', false)">
            <icon-base width="100%" height="100%" >
                <icon-arrow-up />
            </icon-base>
            <p>Show me the project map</p>
        </div> -->
        <div :class="`text-wrapper ${swapableClass}`" key="text-wrapper"
             ref="textWrapper">
            <h1 :class="swapableClass" @click="handleClick" :key="currentProject.name"
                ref="title">{{ currentProject.name }}</h1>
            <h3 :class="swapableClass" key="summary" ref="summary">{{ currentProject.summary }}</h3>
            <p :class="{ swapableClass: isActive }" key="description" ref="description" :style="{ opacity: 0 }">{{ currentProject.description }}</p>
        </div>
        <div :class="[{ swapableClass: isActive }, 'image-section-wrapper']"
            key="image-section-wrapper" ref="imageSectionWrapper">
            <div class="image-wrapper" v-for="(image, index) in currentProject.imagePaths" :key="`image-wrapper-${index}`">
                <img id="`image-${index}`" key="image" ref="image" :src="require('../assets/images/projects/' + currentProject.imagePaths[index])" />
            </div>
        </div>
        <div class="button-row" key="button-row">
            <!-- <div id="sim-proj-button" class="button" key="sim-btn" ref="sim"
                v-if="isActive">
                <p>Show me something similar</p>
                <icon-base width="100%" height="100%" >
                    <icon-arrow-down />
                </icon-base>
            </div>
            <div id="diff-proj-button" class="button" key="diff-btn" ref="diff"
                v-if="isActive">
                <p>Show me something different</p>
                <icon-base width="100%" height="100%" >
                    <icon-arrow-down />
                </icon-base>
            </div> -->
        </div>
    </transition-group>
</template>

<script>
import ScrollMagic from 'scrollmagic'
import EventBus from '../event-bus'

import IconBase from './icons/IconBase.vue'
import IconArrowDown from './icons/IconArrowDown.vue'
import IconArrowUp from './icons/IconArrowUp.vue'
import IconArrowSide from './icons/IconArrowSide.vue'

export default {
    name: 'ProjectPreview',
    props: ['projects'],
        components: {
        IconBase,
        IconArrowDown,
        IconArrowUp,
        IconArrowSide
    },
    data: function() {
        return {
            isActive: false,
            projectIndex: 0,
            currentProject: this.projects[0],
            currentImageIndex: 0,
            swapableClass: 'animate-swap',
            canSwap: true,
            clickTimeline: null,
            clickAnimations: [],
            scrollTimeline: null,
            scrollState: {
                direction: '',
                count: 0
            }
        }
    },
    methods: {
        swapContent: function() {
            console.log('swapping')
            const { direction } = this.scrollState
            this.projectIndex = this.projects.indexOf(this.currentProject)
            if (direction == 'up') {
                if (this.projectIndex-- >= 0) {
                    this.currentProject = this.projects[this.projectIndex]
                } else {
                    this.currentProject = this.projects[0]
                }
            } else if (direction == 'down') {
                if (this.projectIndex++ < this.projects.length) {
                    this.currentProject = this.projects[this.projectIndex]
                } else {
                    this.currentProject = this.projects[this.projects.length - 1]
                }
            } else {
                console.log('No more projects!')
            }
        },
        handleScroll: function() {
            const scrollThreshold = 3
            const state = this
            let { count, direction } = this.scrollState

            if (count >= scrollThreshold && this.canSwap) {
                this.isActive = false
                this.scrollTimeline.restart()
            }
        },
        handleClick: function() {
            this.isActive = !this.isActive
            this.performClickAnimations()
        },
        performClickAnimations: function() {
            if (!this.isActive) {
                if (!this.clickAnimations[0].reversed) {
                    this.clickAnimations.forEach(anim => {
                        anim.reverse()
                    })
                }
                this.clickAnimations.forEach(anim => {
                    anim.play()
                })
            } else {
                if (this.clickAnimations[0].reversed) {
                    this.clickAnimations.forEach(anim => {
                        anim.reverse()
                    })
                }
                this.clickAnimations.forEach(anim => {
                    anim.play()
                })
            }
        },
        initClickAnimations: function() {
            const { textWrapper, description, imageSectionWrapper } = this.$refs
            const projectContent = [textWrapper, imageSectionWrapper]
            const state = this
            this.clickTimeline = this.$anime.timeline({
                loop: true,
                direction: 'alternate',
                autoplay: false
            })
            const textWrapperAnim = this.$anime({
                targets: textWrapper,
                translateX: -400,
                translateY: -250,
                scale: 0.6,
                duration: 250,
                easing: 'easeInOutSine'
            })
            const descriptionAnim = this.$anime({
                targets: description,
                opacity: 1,
                duration: 750,
                easing: 'easeInOutSine'
            })
            const imageWrapperAnim = this.$anime({
                targets: imageSectionWrapper,
                translateY: 1100,
                opacity: 1,
                duration: 250,
                easing: 'easeInOutSine',
            })
            this.clickAnimations.push(textWrapperAnim, descriptionAnim, imageWrapperAnim)
            this.clickAnimations.forEach(anim => {
                anim.reverse()
            })
        },
        initScrollAnimations: function(callback_1, callback_2) {
            const state = this
            this.scrollTimeline = this.$anime.timeline({ autoplay: false })
            this.scrollTimeline
            .add({
                targets: '.animate-swap',
                translateY: -300,
                opacity: 0,
                duration: 500,
                easing: 'linear'
            })
            .add({
                targets: '.animate-swap',
                translateY: 400,
                duration: 10,
                easing: 'linear',
                complete: function() {
                    state.swapContent()
                }
            })
            .add({
                targets: '.animate-swap',
                translateY: -25,
                duration: 500,
                opacity: 1,
                easing: 'linear',
                complete: function() {
                    console.log('swapped')
                    state.canSwap = false
                    state.scrollState.count = 0
                    setTimeout(function() {
                        state.canSwap = true
                    }, 250)
                }
            })
        },
    },
    mounted() {
        const state = this
        this.initClickAnimations()
        this.initScrollAnimations()
        EventBus.$on('scrolling', scrollObj => {
            if (state.canSwap) {
                state.scrollState = scrollObj
                state.handleScroll()
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .preview-wrapper {
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-rows: repeat(5, 1fr);
        grid-template-areas:
        ". . ."
        ". info ."
        ". info ."
        ". info ."
        ".  .   .";
        overflow: hidden;
        .text-wrapper {
            grid-area: info;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-content: center;
            margin: 0 auto;
            text-align: center;
            h1 {
                flex-basis: 8em;
                font-size: 7em;
                cursor: pointer;
            }
            h3 {
                margin-top: -1em;
                flex-basis: 4em;
                font-size: 3em;
            }
            p { opacity: 0; }
        }
        .image-section-wrapper {
            position: absolute;
            display: grid;
            margin: auto;
            top: -100vh;
            left: 50vw;
            width: 45rem;
            height: 35rem;
            opacity: 0;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: repeat(3, 1fr);
            grid-template-areas:
            "main-img main-img main-img"
            "main-img main-img main-img"
            "   .     img_2    img_3";
            .image-wrapper {
                overflow: hidden;
                &:nth-of-type(1) {
                    grid-area: main-img;
                }
                &:nth-of-type(2) {
                    grid-area: img_2;
                }
                &:nth-of-type(3) {
                    grid-area: img_3;
                }
                img {
                    width: 100%;
                }
            }
        }
        &.active {
            .text-wrapper {
                text-align: left;
                height: 75vh;
                p {
                    margin-bottom: -7em;
                    font-size: 2em;
                    max-width: 550px;
                }
                // p {
                //     margin-top: 5em;
                //     color: $charcoal;
                //     font-size: 2em;
                // }
            }
            // .button {
            //     margin: 0 auto;
            //     width: 5rem;
            //     height: 5rem;
            //     min-width: 44px;
            //     min-height: 44px;
            //     justify-content: center;
            //     align-content: center;
            //     &#sim-proj-button {
            //         grid-area: sim-btn;
            //     }
            //     &#diff-proj-button {
            //         grid-area: diff-btn;
            //     }
            // }
        }
    }
</style>
