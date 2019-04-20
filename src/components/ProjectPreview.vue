<template>
    <transition-group name="expand" tag="div"
        :class="[{ active: isActive }, 'preview-wrapper']"
        :css="false" mode="out-in">
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
        <div v-if="!isActive" class="scroll-icon-mouse" key="scroll-icon-mouse">
            <div class="scroll-icon-wheel" key="scroll-icon-wheel"
                :style="{ opacity: 0 }">
            </div>
        </div>
    </transition-group>
</template>

<script>
import EventBus from '../event-bus'

export default {
    name: 'ProjectPreview',
    props: ['projects'],
    data: function() {
        return {
            isActive: false,
            currentProject: this.projects[0],
            currentAsset: null,
            swapableClass: 'animate-swap',
            canSwap: true,
            clickTimeline: null,
            clickAnimations: [],
            scrollTimeline: null,
            mouseIconTimeline: null,
            scrollState: {
                direction: '',
                count: 0
            }
        }
    },
    computed: {
        projectIndex: function() {
            return this.projects.indexOf(this.currentProject)
        },
        reachedProjectBounds: function() {
            const { direction } = this.scrollState
            return ((this.projectIndex == 0 && direction == 'up') || 
                    (this.projectIndex == this.projects.length - 1 && direction == 'down'))
        }
    },
    methods: {
        getSanitizedDescription(text) {
            return text.replace(/\n/g,"<br /><br />")
        },
        swapContent: function() {
            const { direction } = this.scrollState
            if (direction == 'up' && this.projectIndex - 1 >= 0) {
                this.currentProject = this.projects[this.projectIndex - 1]
            } else if (direction == 'down' && this.projectIndex + 1 < this.projects.length) {
                this.currentProject = this.projects[this.projectIndex + 1]
            }
            console.log('Project index: ' + this.projectIndex)
        },
        handleScroll: function() {
            const scrollThreshold = 3
            let { count } = this.scrollState
            if (count >= scrollThreshold && this.canSwap
                && !this.reachedProjectBounds) {
                this.isActive = false
                this.canSwap = false
                count = 0;
                this.scrollTimeline.restart()
                this.displaceMouseIcon()
            }
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
                translateY: -(window.innerHeight / 5),
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
                translateX: -(window.innerHeight * 1.5),
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
                    setTimeout(function() {
                        state.canSwap = true
                    }, 1000)
                }
            })
        },
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
        displaceMouseIcon: function() {
            
        },
        initAllAnimations: function() {
            this.initClickAnimations()
            this.initScrollAnimations()
            this.initMouseIconAnimations()
        }
    },
    created() {
        this.currentAsset = this.currentProject.assets[0]
    },
    mounted() {
        const state = this 
        const { imageSectionWrapper } = this.$refs
        this.initAllAnimations()

        EventBus.$on('scrolling', scrollObj => {
            if (!state.canSwap) return;
            state.scrollState = scrollObj
            state.handleScroll()
        })
    }
}
</script>

<style lang="scss" scoped>
    .preview-wrapper {
        .scroll-icon-mouse {
            margin: 0 auto;
            margin-top: 12em;
            width: 3px;
            padding: 10px 15px;
            height: 35px;
            border: 2px solid #000;
            border-radius: 25px;
            opacity: 0.75;
            box-sizing: content-box;
            .scroll-icon-wheel {
                width: 3px;
                height: 10px;
                border-radius: 25%;
                background-color: #000;
            }
        }
        //overflow: hidden;
        * {
            will-change: transform, opacity;
        }
        .text-wrapper {
            display: flex;
            flex-flow: column;
            //justify-content: center;
            align-content: center;
            margin: 0 auto;
            margin-top: 5em;
            width: 60vw;
            height: 50vh;
            text-align: center;
            * {
                cursor: pointer;
                //filter: saturate(100%);
            }
            h1 {
                //flex-basis: 8em;
                &:hover {
                    opacity: 1;
                    transition: all 0.25s ease-out;
                }   
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
            top: 5vh;
            left: 120vw;
            width: 45rem;
            height: 90rem;
            opacity: 0;
            //overflow: scroll;
            grid-column-gap: 20px;
            grid-row-gap: 20px;
            &#image-section-wrapper-0 {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: repeat(3, 1fr);
                grid-template-areas: 
                "media_0 media_0"
                "media_1 media_2"
                "media_1 media_2";
            }
            &#image-section-wrapper-1 {
                height: 110rem;
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
                grid-template-columns: 1fr 1fr;
                grid-template-rows: repeat(2, 1fr);
                grid-template-areas: 
                "media_0 media_1"
                "media_0 media_1";
            }
            &#image-section-wrapper-3 {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: repeat(3, 1fr);
                grid-template-areas: 
                "media_1 media_1"
                "media_0 media_2"
                "media_0 media_2";
            }
            &#image-section-wrapper-4 {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: repeat(3, 1fr);
                grid-template-areas: 
                "media_0 media_0"
                "media_1 media_2"
                "media_1 media_2";
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
                max-height: 450px;
                object-fit: contain;
            }
        }
        &.active {
            overflow: scroll;
            .text-wrapper {
                //margin-top: 0 !important;
                margin-top: 2rem;
                text-align: left;
                height: 75vh;
                span {
                    display: block;
                }
                #description {
                    margin-bottom: -7em;
                    width: 100%;
                    max-width: 750px;
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
