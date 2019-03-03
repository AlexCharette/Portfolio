<template>
    <transition-group name="expand-preview" tag="div">
        <div class="preview-inner-wrapper" key="project-wrapper" 
            @click="handleClick">
            <h2 :key="project.name">{{ project.name }}</h2>
            <p :key="project.summary">{{ text }}</p>
        </div>
    </transition-group>
</template>

<script>
export default {
    name: 'ProjectPreview',
    props: ['project'],
    data: function() {
        return {
            text: 'not clicked'
        }
    },
    methods: {
        handleClick: function() {
            this.updateText()
            this.updateExpandedStatus()
            this.emitProjectData()
        },
        updateText: function() {
            this.text = 'clicked'
            console.log(this.text)
        },
        updateExpandedStatus: function() {
            this.$emit('update-expanded-status', true)
        },
        emitProjectData: function() {
            console.log("Project data emmited")
            this.$emit('update-expanded-project-data', this.project)
        }
    }
}
</script>

<style lang="scss" scoped>
    .preview-inner-wrapper {
        width: 100%;
        height: 100%;
        border: solid red;
    }
</style>
