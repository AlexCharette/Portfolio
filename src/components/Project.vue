<template>
    <div id="project">
        <transition-group name="project" tag="div">
            <h2 key="name">{{ name }}</h2>
            <h3 key="date">{{ date }}</h3>
            <p key="description">{{ description }}</p>
            <p key="summary">{{ summary }}</p>
            <div id="image-wrapper">
            </div>
            <button id="similar-proj-button" />
            <button id="different-proj-button" />
        </transition-group>
    </div>
</template>

<script>
export default {
    name: 'Project',
    props: ['name', 
            'date', 
            'keywords', 
            'summary', 
            'description'
    ]
}
</script>

<style lang="scss" scoped>

</style>