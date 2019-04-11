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
             ref="textWrapper"
             @click="handleProjectClick">
            <h1 :class="swapableClass" :key="currentProject.name"
                ref="title">{{ currentProject.name }}</h1>
            <h4 :class="swapableClass" key="summary" ref="summary">{{ currentProject.summary }}</h4>
            <div id="description" :class=" isActive ? swapableClass : '' " key="description" ref="description" 
                :style="{ opacity: !isActive ? 0 : '' }">
                <h5>{{ currentProject.date }}</h5>
                <h5>Medium: {{ currentProject.materials }}</h5>
                <p v-html="getSanitizedDescription(currentProject.description)"></p>
            </div>
        </div>
        <div :id="`image-section-wrapper-${currentProject.index}`"
            :class="[ isActive ? swapableClass : '', 'image-section-wrapper']"
            :style="{ opacity: !isActive ? 0 : '' }"
            key="image-section-wrapper" ref="imageSectionWrapper">
            <div v-for="(image, index) in currentProject.assets" :key="`image-wrapper-${index}`"
                :id="`image-wrapper-${index}`" 
                :class="[(currentProject.assets[index].type == 'image') ? 'image-wrapper' : 'iframe-wrapper']"
                :style="{ gridArea: `media_${index}` }">
                <component :id="(currentProject.assets[index].type == 'image') ? `image-${index}` : `video-${index}`" 
                    key="image" ref="image"
                    :is="(currentProject.assets[index].type == 'image') ? 'img' : 'iframe'"
                    :allowfullscreen="(currentProject.assets[index].type == 'video')"
                    :src="(currentProject.assets[index].type == 'image') ? require(`../assets/images/projects/${currentProject.assets[index].path}`) : currentProject.assets[index].path"/>
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
import Player from '@vimeo/player'
import Masonry from 'masonry-layout'

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
            mainAsset: null,
            currentAsset: null,
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
        getSanitizedDescription(text) {
            return text.replace(/\n/g,"<br /><br />")
        },
        swapContent: function() {
            console.log('swapping')
            const { direction } = this.scrollState
            this.projectIndex = this.projects.indexOf(this.currentProject)
            console.log('Project index: ' + this.projectIndex)
            if (direction == 'up') {
                if (this.projectIndex - 1 >= 0) {
                    this.currentProject = this.projects[this.projectIndex - 1]
                } else {
                    this.currentProject = this.projects[0]
                }
            } else if (direction == 'down') {
                if (this.projectIndex + 1 < this.projects.length) {
                    this.currentProject = this.projects[this.projectIndex + 1]
                } else {
                    this.currentProject = this.projects[this.projects.length - 1]
                }
            }
        },
        handleScroll: function() {
            const scrollThreshold = 3
            let { count, direction } = this.scrollState
            if (count >= scrollThreshold && this.canSwap) {
                this.isActive = false
                this.canSwap = false
                this.scrollTimeline.restart()
            }
        },
        handleImageClick: function(event) {
            this.swapGridArea(event)
        },
        handleProjectClick: function(event) {
            this.isActive = !this.isActive
            this.$store.dispatch('setDisplayProject', this.isActive)
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
                translateY: -(window.innerHeight / 2.8),
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
                translateY: (window.innerHeight * 1.1),
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
        initScrollAnimations: function() {
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
                translateY: -(window.innerHeight / 6),
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
                    state.scrollState.count = 0
                    setTimeout(function() {
                        state.canSwap = true
                    }, 250)
                }
            })
        },
    },
    created() {
        this.currentAsset = this.currentProject.assets[0]
        console.log(this.currentAsset.type)
    },
    mounted() {
        const state = this 
        const { imageSectionWrapper } = this.$refs
        this.initClickAnimations()
        this.initScrollAnimations()

        window.addEventListener('scroll', function() {
            console.log('scrolling')
        })

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
        //overflow: hidden;
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
            margin-top: 300px;
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
            left: 45vw;
            width: 45rem;
            height: 120rem;
            opacity: 0;
            overflow: scroll;
            &#image-section-wrapper-0 {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: repeat(3, 1fr);
                grid-template-areas: 
                "media_0 media_0"
                "media_1 media_2"
                "media_1 media_2";
            }
            &#image-section-wrapper-1 {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: repeat(5, 1fr);
                grid-template-areas: 
                "media_0 media_0"
                "media_1 media_2"
                "media_1 media_2"
                "media_3 ."
                "media_3 .";
            }
            &#image-section-wrapper-2 {

            }
            .image-wrapper, .iframe-wrapper {
                overflow: hidden;
                img, iframe {
                    width: 100%;    
                }
                iframe {
                    height: 100%;
                    border: none !important;
                }
            }
            .iframe-wrapper {
                object-fit: contain;
            }
        }
        &.active {
            overflow: scroll;
            .text-wrapper {
                margin-top: 0 !important;
                text-align: left;
                height: 75vh;
                span {
                    display: block;
                }
                #description {
                    margin-bottom: -7em;
                    width: 100%;
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
