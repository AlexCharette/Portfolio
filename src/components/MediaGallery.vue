<template>
    <div>
        <div :id="`image-wrapper-${index}`" 
            :class="[(index == 0) ? 'main-image-wrapper main-img' : `img_${index + 1}`, 'image-wrapper']"
            v-for="(image, index) in currentProject.imagePaths" :key="`image-wrapper-${index}`"
            @click="handleClick($event)">
            <component :id="(projectIndex > 1 || index != 0) ? 'video' : `image-${index}`" 
                key="image" ref="image"
                :is="(projectIndex > 1 || index != 0) ? 'img' : 'iframe'"
                :allowfullscreen="!(projectIndex > 1 || index != 0)"
                :src="(projectIndex > 1 || index != 0) ? require(`../assets/images/projects/${currentProject.imagePaths[index]}`) : currentProject.imagePaths[index]"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MediaGallery',
    props: ['currentProject', 'projectIndex'],
    data: function() {
        return {
            currentImageIndex: 0,
        }
    },
    methods: {
        swapGridArea: function(event) {
            const mainImage = document.getElementsByClassName('main-img')[0]
            mainImage.classList.toggle('main-img')
            event.target.parentElement.classList.toggle('main-img')
        },
        handleImageClick: function(event) {
            this.swapGridArea(event)
        }
    }
}
</script>


<style lang="scss" scoped>
    div {
        position: absolute;
        display: grid;
        margin: auto;
        top: -100vh;
        left: 40vw;
        width: 45rem;
        height: 35rem;
        opacity: 0;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 20px;
        column-gap: 20px;
        grid-row-gap: 20px;
        row-gap: 20px;
        grid-template-areas:
        "main-img main-img img_2"
        "main-img main-img img_3"
        "main-img main-img img_4";
        .image-wrapper {
            overflow: hidden;
            &.main-img {
                grid-area: main-img;
                img, iframe {
                max-width: 700px;
                max-height: 600px; 
                transition: all 0.25s ease-in-out;
                }
                img {
                    width: auto;
                    height: auto;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                }
            }
            &.img-2 {
                grid-area: img_2;
            }
            &.img-3 {
                grid-area: img_3;
            }
            &.img-4 {
                grid-area: img_4;
            }
            img, iframe {
                width: 100%;
                    
            }
            iframe {
                height: 100%;
            }
        }
    }
</style>
