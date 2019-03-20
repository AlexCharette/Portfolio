<template>
    <transition-group id="active-project" name="project" tag="div">
        <div key="exit-btn" ref="exit"
            id="exit-proj-button" class="button"
            @hover="displayButtonText('exit')"
            @click="$emit('update-expanded-status', false)">
            <icon-base width="100%" height="100%" >
                <icon-arrow-up />
            </icon-base>
            <p>{{ exitText }}</p>
        </div>
        <div key="info-wrap" id="info-wrapper">
            <h2 key="name">{{ projectData.name }}</h2>
            <h3 key="date">{{ projectData.date }}</h3>
            <p key="description">{{ projectData.description }}</p>
        </div>
        <p key="summary">{{ projectData.summary }}</p>
        <div key="img-wrap" id="image-wrapper">
            <!-- img @mouseenter="expandImage" :src="require('../assets/images/projects/' + projectData.imagePaths[0])" -->
        </div>
        <div key="sim-btn" ref="sim"
            id="sim-proj-button" class="button">
            <p>{{ simText }}</p>
            <icon-base width="100%" height="100%" >
                <icon-arrow-down />
            </icon-base>
        </div>
        <div key="diff-btn" ref="diff"
            id="diff-proj-button" class="button">
            <p>{{ diffText }}</p>
            <icon-base width="100%" height="100%" >
                <icon-arrow-side />
            </icon-base>
        </div>
    </transition-group>
</template>

<script>
import IconBase from './icons/IconBase.vue'
import IconArrowDown from './icons/IconArrowDown.vue'
import IconArrowUp from './icons/IconArrowUp.vue'
import IconArrowSide from './icons/IconArrowSide.vue'

export default {
    name: 'ActiveProject',
    components: {
        IconBase,
        IconArrowDown,
        IconArrowUp,
        IconArrowSide
    },
    props: ['projectData'],
    data: function() {
        return {
            exitText: 'Get a broader look',
            simText: 'Show me something similar',
            diffText: 'Show me something different'
        }
    },
    methods: {
        expandImage: function() {
            console.log('image expanded')
        },
        displayButtonText: function(msg) {
            const { exit, sim, diff } = this.$refs
            switch(msg) {
                case 'exit':

                break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #active-project {
        position: absolute;
        display: grid;
        margin-top: 5vh;
        width: 100vw;
        height: 95vh;
        padding: 2rem;
        grid-template-columns: 1fr 1.5fr 0.5fr;
        grid-template-rows: repeat(5, 1fr);
        grid-template-areas:
        "info exit-btn ."
        "info img      diff-btn"
        "info img      diff-btn"
        "info img      ."
        ".    sim-btn .";
        z-index: 100;
        pointer-events: none;
        * { pointer-events: auto; }
        #info-wrapper {
            grid-area: info;
            display: flex;
            flex-direction: column;
        }
        #image-wrapper {
            width: 25rem;
            height: 20rem;
            overflow: hidden;
            grid-area: img;
            img {
                width: 100%;
            }
        }
        .button {
            margin: 0 auto;
            width: 5rem;
            height: 5rem;
            min-width: 44px;
            min-height: 44px;
            justify-content: center;
            align-content: center;
            &#sim-proj-button {
                grid-area: sim-btn;
            }
            &#diff-proj-button {
                grid-area: diff-btn;
            }
        }
    }
</style>