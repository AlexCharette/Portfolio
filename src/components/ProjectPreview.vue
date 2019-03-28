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
            <h4 :class="swapableClass" key="summary" ref="summary">{{ currentProject.summary }}</h4>
            <div id="description" :class=" isActive ? swapableClass : '' " key="description" ref="description" :style="{ opacity: !isActive ? 0 : '' }">
                <h5>{{ currentProject.date }}</h5>
                <h5>Medium: {{ currentProject.materials }}</h5>
                <p>{{ currentProject.description }}</p>
            </div>
        </div>
        <div :class="[isActive ? swapableClass : '', 'image-section-wrapper']"
            :style="{ opacity: !isActive ? 0 : '' }"
            key="image-section-wrapper" ref="imageSectionWrapper">
            <div :id="`image-wrapper-${index}`" :class="[(index == 0) ? 'main-image-wrapper main-img' : `img_${index + 1}`, 'image-wrapper']"
                v-for="(image, index) in currentProject.imagePaths" :key="`image-wrapper-${index}`"
                @click="swapGridArea($event)">
                <component :id="`image-${index}`" key="image" ref="image"
                    :is="(projects.indexOf(currentProject) > 1 || index != 0) ? 'img' : 'iframe'"
                    :allowfullscreen="!(projects.indexOf(currentProject) > 1 || index != 0)"
                    :src="(projects.indexOf(currentProject) > 1 || index != 0) ? require(`../assets/images/projects/${currentProject.imagePaths[index]}`) : currentProject.imagePaths[index]"/>
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
        swapGridArea: function(event) {
            const mainImage = document.getElementsByClassName('main-img')[0]
            console.log('Current main image: ' + mainImage)
            console.log(event.target + ' was clicked')
            mainImage.classList.toggle('main-img')
            event.target.parentElement.classList.toggle('main-img')
        },
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
                translateZ: 0,
                rotate: 0.01,
                easing: 'linear',
                loop: true,
                direction: 'alternate',
                autoplay: false
            })
            const textWrapperAnim = this.$anime({
                targets: textWrapper,
                translateX: -(window.innerWidth / 3.5),
                translateY: -(window.innerHeight / 2.3),
                translateZ: 0,
                rotate: 0.01,
                scale: 0.6,
                easing: 'easeInOutCubic',
                duration: 250
            })
            const descriptionAnim = this.$anime({
                targets: description,
                opacity: 1,
                translateZ: 0,
                rotate: 0.01,
                easing: 'easeInOutCubic',
                duration: 500
            })
            const imageWrapperAnim = this.$anime({
                targets: imageSectionWrapper,
                translateY: (window.innerHeight * 1.2),
                translateZ: 0,
                rotate: 0.01,
                opacity: 1,
                easing: 'easeInOutCubic',
                duration: 250
            })
            this.clickAnimations.push(textWrapperAnim, descriptionAnim, imageWrapperAnim)
            this.clickAnimations.forEach(anim => {
                anim.reverse()
            })
        },
        initScrollAnimations: function(callback_1, callback_2) {
            const state = this
            this.scrollTimeline = this.$anime.timeline({
                translateZ: 0,
                rotate: 0.01,
                easing: 'easeInOutCubic',
                autoplay: false
            })
            this.scrollTimeline
            .add({
                targets: '.animate-swap',
                translateY: -(window.innerHeight / 5),
                opacity: 0,
                duration: 500
            })
            .add({
                targets: '.animate-swap',
                translateY: (window.innerHeight / 4),
                duration: 10,
                complete: function() {
                    state.swapContent()
                }
            })
            .add({
                targets: '.animate-swap',
                translateY: -10,
                duration: 500,
                opacity: 1,
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
        ". . ."
        ". info ."
        ". info ."
        ".  .   .";
        overflow: hidden;
        * {
            will-change: transform, opacity;
        }
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
                cursor: pointer;
            }
            h4 {
                margin-top: -1em;
                flex-basis: 4em;
            }
        }
        .image-section-wrapper {
            position: absolute;
            display: grid;
            margin: auto;
            top: -100vh;
            left: 40vw;
            width: 45rem;
            height: 35rem;
            opacity: 0;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: repeat(3, 1fr);
            grid-column-gap: 20px;
            column-gap: 20px;
            grid-row-gap: 20px;
            row-gap: 20px;
            grid-template-areas:
            "main-img main-img main-img"
            "main-img main-img main-img"
            " img_2    img_3    img_4";
            .image-wrapper {
                overflow: hidden;
                &.main-img {
                    grid-area: main-img;
                }
                &.img-2 {
                    grid-area: img_2;
                }
                &.img-3 {
                    grid-area: img_3;
                }
                &.img-4 {
                    grid-area: img_4;
                }
                img, iframe {
                    //width: 100%;
                    height: 100%;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        &.active {
            .text-wrapper {
                text-align: left;
                height: 75vh;
                span {
                    display: block;
                }
                #description {
                    margin-bottom: -7em;
                    max-width: 550px;
                    h5 {
                        margin-bottom: 0;
                        margin-top: 15px;
                        &:nth-of-type(1) {
                            margin-top: -50px;
                        }
                    }
                }
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
