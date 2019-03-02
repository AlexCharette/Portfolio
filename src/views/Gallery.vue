<template>
    <div id="gallery" class="page">
        <project-preview  
            v-for="(project, index) in projects"
            :key="project.name"
            :id="`project-preview-${index}`"
            class="gallery-element"  
            :project="project"
            @update-expanded-project-data="onUpdateExpandedProjectData"
            @update-expanded-status="onUpdateExpandedStatus"/>
        <project v-if="hasExpandedProject" />
    </div>
</template>

<script>
import ProjectPreview from '@/components/ProjectPreview.vue'
import Project from '@/components/Project.vue'
import data from '@/assets/data/projects.json'

export default {
    name: 'Gallery',
    components: {
        ProjectPreview, 
        Project
    },
    data: function() {
        return {
            projects: data.projects,
            hasExpandedProject: false,
            expandedProjectData: null
        }
    },
    methods: {
        onUpdateExpandedStatus: function(e) {
            console.log("Expanded project status: " + e)
            hasExpandedProject = e
            this.$store.dispatch('setDisplayProject', hasExpandedProject)
        },
        onUpdateExpandedProjectData: function(e) {
            console.log("Update expanded project data")
            this.expandedProjectData = e 
        }
    }    
}
</script>

<style lang="scss" scoped>
    $num-projects: 7;
    @include desktop-laptop {
        #gallery {
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

