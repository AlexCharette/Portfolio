<template>
    <main>
        <project-preview id="project-preview" class="gallery-element"
            :projects="projects" />
    </main>
</template>

<script>
import ProjectPreview from '@/components/ProjectPreview.vue'
import data from '@/assets/data/projects.json'
import EventBus from '../event-bus'

export default {
    name: 'Gallery',
    components: {
        ProjectPreview
    },
    data: function() {
        return {
            projects: data.projects.slice(0, data.projects.length - 1),
            hasExpandedProject: false,
            activeProjectData: null
        }
    },
    methods: {
        onUpdateExpandedStatus: function(newState) {
            console.log("Expanded project status: " + newState)
            this.hasExpandedProject = newState
            this.$store.dispatch('setDisplayProject', this.hasExpandedProject)
        },
        onUpdateActiveProjectData: function(newData) {
            console.log("Update active project data: " + newData)
            this.activeProjectData = newData
        },
        setExpanded: function(newState) {
            this.hasExpandedProject = newState
        }
    },
    mounted() {
        EventBus.$on('reverse-key-pressed', (e, vm = this) => {
            e.preventDefault()
            console.log("Reverse key pressed!")
            this.setExpanded(false)
        })
    }
}
</script>

<style lang="scss" scoped>
    $num-projects: 5;
    .blur .gallery-element {
        @include blur;
    }
    @include desktop-laptop {
        main {
            display: flex;
            flex-flow: column;
            width: 100vw;
            height: ($num-projects * 100vh);
            .gallery-element {
                margin: 0 auto;
                width: 100vw;
                height: 100vh;
                place-self: center;
            }
        }
    }
    @include mobile {
        display: flex;
    }
</style>

