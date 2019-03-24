<template>
    <transition-group name="expand-preview" tag="div"
        class="preview-wrapper">
        <div class="preview-inner-wrapper" key="project-wrapper"
            @click="handleClick">
            <h2 :key="project.name">{{ project.name }}</h2>
            <p :key="project.summary">{{ project.summary }}</p>
        </div>
    </transition-group>
</template>

<script>
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
    .preview-wrapper {
        display: flex;
        align-content: center;
        justify-content: center;
        border: solid red;
        border-radius: 15%;
        .preview-inner-wrapper {
            margin: 0 auto;
            margin-top: 7%;
            width: 80%;
            height: 50%;
            text-align: center;
            h2 {
                font-size: 1.5em;
            }
            p {
                font-size: 1rem;
            }
        }
    }
</style>
