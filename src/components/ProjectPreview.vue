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
import EventBus from '../event-bus'

export default {
    name: 'ProjectPreview',
    props: ['project'],
    methods: {
        handleClick: function() {
            this.$emit('update-expanded-status', true)
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
