<<<<<<< HEAD
<template>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" :style="{ stopColor: startColor, stopOpacity: 1 }" />
                <stop offset="100%" :style="{ stopColor: endColor, stopOpacity: 1 }" />
            </linearGradient>
        </defs>
        <slot></slot>
    </svg>
</template>

<script>
export default {
    name: 'TextGradient',
    props: ['startColor', 'endColor']
}
</script>


<style lang="scss" scoped>
    #text {
        width: 100%;
        height: 100%;
    }
</style>

=======
<template>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" :style="{ stopColor: startColor, stopOpacity: 1 }" />
                <stop offset="100%" :style="{ stopColor: endColor, stopOpacity: 1 }" />
            </linearGradient>
        </defs>
        <slot></slot>
    </svg>
</template>

<script>
export default {
    name: 'TextGradient',
    props: ['startColor', 'endColor']
}
</script>


<style lang="scss" scoped>
    #text {
        width: 100%;
        height: 100%;
    }
</style>

>>>>>>> 37d16293c0a0af7383dd9aa7fef12f8653a8ee8c
