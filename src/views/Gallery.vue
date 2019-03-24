<template>
    <main :class="{ blur: hasExpandedProject }">
        <project-preview v-for="(project, index) in projects"
            :key="project.name"
            :id="`project-preview-${index}`"
            class="gallery-element"
            :project="project"
            @update-expanded-project-data="onUpdateActiveProjectData"
            @update-expanded-status="onUpdateExpandedStatus" />
        <active-project :project-data="activeProjectData" v-if="hasExpandedProject"
            @update-expanded-status="onUpdateExpandedStatus" />
    </main>
</template>

<script>
import ProjectPreview from '@/components/ProjectPreview.vue'
import ActiveProject from '@/components/ActiveProject.vue'
import data from '@/assets/data/projects.json'
import EventBus from '../event-bus'

export default {
    name: 'Gallery',
    components: {
        ProjectPreview,
        ActiveProject
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
            display: grid;
            margin: 0 auto !important;
            margin-top: 10rem !important;
            width: 90vw;
            height: 80vh;
            grid-template-columns: repeat(4, 1fr [col-start]);
            grid-template-rows: repeat(3, 1fr);
            grid-template-areas: "project-0 project-1 . project-2"
                                 "project-3    .      . project-4"
                                 "   .         .      .    .     ";
            .gallery-element {
                width: 15rem;
                height: 10rem;
                place-self: center;
                @for $i from 0 to $num-projects {
                    &#project-preview-#{$i} {
                        grid-area: project-#{$i};
                    }
                }
            }
        }
    }
    @include mobile {
        display: flex;
    }
</style>

