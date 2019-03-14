<template>
    <transition-group id="active-project" name="project" tag="div">
        <button key="exit-btn" id="exit-proj-button" class="button"
            @click="$emit('update-expanded-status', false)">
            Look everything over.
        </button>
        <div key="info-wrap" id="info-wrapper">
            <h2 key="name">{{ projectData.name }}</h2>
            <h3 key="date">{{ projectData.date }}</h3>
            <p key="description">{{ projectData.description }}</p>
        </div>
        <p key="summary">{{ projectData.summary }}</p>
        <div key="img-wrap" id="image-wrapper">
            <img @mouseenter="expandImage" />
        </div>
        <button key="sim-btn" id="sim-proj-button" class="button">
            Show me something similar.
        </button>
        <button key="diff-btn" id="diff-proj-button" class="button">
            Show me something different.
        </button>
    </transition-group>
</template>

<script>
export default {
    name: 'ActiveProject',
    props: ['projectData'],
    methods: {
        expandImage: function() {
            console.log('image expanded')
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
        "info img      sim-btn"
        "info img      sim-btn"
        "info img      ."
        ".    diff-btn .";
        z-index: 100;
        pointer-events: none;
        * { pointer-events: auto; }
        #info-wrapper {
            grid-area: info;
            display: flex;
            flex-direction: column;
        }
        #image-wrapper {
            grid-area: img;
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