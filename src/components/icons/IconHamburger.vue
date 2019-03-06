<template>
    <svg @click="toggle"
         viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         width="100%" height="100%"
         fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round"
         stroke-miterlimit="1.414">
        <path id="Icons" fill="none" d="M0 0h800v600H0z"/>
        <path ref="topBar" d="M789.681 416.851c0-14.009-11.375-25.384-25.385-25.384H35.704c-14.01 0-25.385 11.375-25.385 25.384v50.769c0 14.01 11.375 25.384 25.385 25.384h728.592c14.01 0 25.385-11.374 25.385-25.384v-50.769z"
            fill="red" stroke="red" stroke-width="5px" />
        <path ref="midBar" d="M726.02 132.38c0-14.01-11.374-25.384-25.384-25.384H99.364c-14.01 0-25.384 11.374-25.384 25.384v50.769c0 14.009 11.374 25.384 25.384 25.384h601.272c14.01 0 25.384-11.375 25.384-25.384V132.38z"
            fill="red" stroke="red" stroke-width="5px" />
        <path ref="botBar" d="M712.835 273.683c0-14.01-11.374-25.384-25.384-25.384H112.549c-14.01 0-25.384 11.374-25.384 25.384v50.768c0 14.01 11.374 25.384 25.384 25.384h574.902c14.01 0 25.384-11.374 25.384-25.384v-50.768z"
            fill="red" stroke="red" stroke-width="5px" />
    </svg>
</template>

<script>
import { TimelineLite } from 'gsap'

export default {
    name: 'IconHamburger',
    methods: {
        toggle: function() {
            const { topBar, midBar, botBar } = this.$refs
            const timeline = new TimelineLite()
            timeline.to(topBar, 0.25, { scale: 1.5, rotation: 90 })
        }
    }
}
</script>



