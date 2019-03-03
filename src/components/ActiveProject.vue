<template>
    <transition-group id="active-project" name="project" tag="div">
        <div key="info-wrap" id="info-wrapper">
            <h2 key="name">{{ projectData.name }}</h2>
            <h3 key="date">{{ projectData.date }}</h3>
            <p key="description">{{ projectData.description }}</p>
        </div>
        <p key="summary">{{ projectData.summary }}</p>
        <div key="img-wrap" id="image-wrapper">
        </div>
        <button key="sim-btn" id="sim-proj-button" />
        <button key="diff-btn" id="diff-proj-button" />
    </transition-group>
</template>

<script>
export default {
    name: 'ActiveProject',
    props: ['projectData']
}
</script>

<style lang="scss" scoped>
    #active-project {
        position: absolute;
        display: grid;
        margin-top: 5vh;
        width: 100vw;
        height: 95vh;
        grid-template-columns: 1fr 1.5fr 0.5fr;
        grid-template-rows: repeat(4, 1fr);
        grid-template-areas:
        "info img    ."
        "info img    sim-btn"
        "info img    sim-btn"
        ".    diff-btn .";
        z-index: 100;
        pointer-events: none;
        * {
            pointer-events: auto;
        }
        #info-wrapper {
            grid-area: info;
            display: flex;
            flex-direction: column;
        }
        #image-wrapper {
            grid-area: img;
        }
        #sim-proj-button {
            grid-area: sim-btn;
        }
        #diff-proj-button {
            grid-area: diff-btn;
        }
    }
</style>