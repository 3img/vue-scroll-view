<template>
    <div ref="scrollViewMain" class="_v-container" 
    @touchstart.stop="touchstartHandler($event)"
    @touchend.stop="touchendHandler($event)"
    @touchmove.stop="touchMove($event)"
    @mousewheel.stop="mousewheelHandler($event)">
        
        <div class="_v-content" ref="scrollViewListOne" :style="listStyle">
            <template v-for="(item) in clipData">
                <slot :item="item" ></slot>
            </template>
        </div>

    <div class="console">top:{{top}} - timeStamp:{{touchstartTime}} -</div>
    </div>
</template>

<script>
export default {
    name: 'scroller-view',
    
    props:{
       "vh":{
            type:Number,
            default:300
        },
        "ch":{
            type:Number,
            default:30
        },
        "data":Array
    },

    computed:{
        clipData(){
            let _max = this.cid + this.len
            let _i = this.cid
            let _arr = []
            for(;_i<_max;_i++){
                if(!!this.data[_i]){
                    _arr.push(this.data[_i])
                }else{
                    this.isEnd = true
                }
            }
            return _arr
        },

        listStyle(){
            return {
                "margin-top":this.cid * this.ch + 'px',
                // "margin-bottom":(this.data.length - this.len - this.cid) * this.ch + 'px'
            }
        },

        scrollHeight(){
            return this.ch * this.data.length - this.vh
        },

        
    },

    data(){
        return {
            cid:0,
            len:30,
            isEnd:false,
            isTop:false,
            top:0,
            touchstartTime:0
        }
    },

    mounted(){
        this.animate()
        console.log("h:%s",this.scrollHeight)
    },

    methods:{
        setScrollTop(){

        },

        mousewheelHandler(e){
            // console.log(e)
            this.top + e.deltaY < 0 ? this.top = 0 : 
            this.top + e.deltaY >= this.scrollHeight ? this.top = this.scrollHeight : this.top += e.deltaY
        },

        animate(){
            let _top = this.$refs.scrollViewMain.scrollTop
            this.cid = Math.ceil(_top/this.ch)
            requestAnimationFrame(()=>{
                try{
                    this.$refs.scrollViewMain.scrollTop += Math.floor((this.top - _top)/10)
                }catch(err){}
                this.animate()
            })
        },
        
        touchstartHandler(e){
            e.preventDefault()
            this.touchY = e.changedTouches[0].clientY
            this.touchstartTime = e.timeStamp
        },

        touchendHandler(e){
            e.preventDefault()
            let _touchy = e.changedTouches[0].clientY
            let _toucht = e.timeStamp
            
            let _top = (_touchy - this.touchY) * (2000/(_touchy-this.touchstartTime))
            this.top - _top < 0 ? this.top = 0 : this.top - _top > this.scrollHeight ? this.top = this.scrollHeight : this.top -= _top
        },
        
        touchMove(e){
            e.preventDefault()
            let _touchy = e.changedTouches[0].clientY
            let _top = _touchy - this.touchY
            this.touchY = e.changedTouches[0].clientY
            this.top - _top < 0 ? this.top = 0 : this.top - _top > this.scrollHeight ? this.top = this.scrollHeight : this.top -= _top
            
        }
    },


}
</script>

<style type="text/css" scope>
._v-container {
    height: 500px;
    overflow:hidden;
}
.console {
    position:absolute;
    background:seagreen;
    color:#fff;
    width:100%;
    height:2em;
    line-height: 2em;
    left:0;
    top:0;
}
</style>
