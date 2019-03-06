<template>
    <main>
        <project-preview
            v-for="(project, index) in projects"
            :key="project.name"
            :id="`project-preview-${index}`"
            class="gallery-element"
            :project="project"
            @update-expanded-project-data="onUpdateActiveProjectData"
            @update-expanded-status="onUpdateExpandedStatus"/>
        <active-project :project-data="activeProjectData" v-if="hasExpandedProject" />
    </main>
</template>

<script>
import ProjectPreview from '@/components/ProjectPreview.vue'
import ActiveProject from '@/components/ActiveProject.vue'
import data from '@/assets/data/projects.json'

export default {
    name: 'Gallery',
    components: {
        ProjectPreview,
        ActiveProject
    },
    data: function() {
        return {
            projects: data.projects,
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
        }
    }
}
</script>

<style lang="scss" scoped>
    $num-projects: 7;
    @include desktop-laptop {
        main {
            display: grid;
            grid-template-columns: repeat(3, 1fr [col-start]);
            grid-template-rows: repeat(3, 1fr);
            margin: 0 auto;
            width: 90vw;
            height: 100vh;
            grid-template-areas: "project-0 project-1 project-2"
                                "project-3 project-4 ."
                                "project-5 . .";
            .gallery-element {
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

