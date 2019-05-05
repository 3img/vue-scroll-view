<template>
    <div ref="scrollViewItem" class="scroll-view-item">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'scroller-view-item',

    props: {
        "vh":{
            type:Number,
            default:30
        }
    },

    mounted(){

        this.$refs.scrollViewItem.style.height = this.vh + 'px'
    }
}
</script>

<style type="text/css" scope>
.scroll-view-item {
  overflow: hidden;
}
</style>