<template>
  <div id="app">
    <ScrollerView
    :data="data" 
    :vh="500"
    :ch="30">
      <ScrollerViewItem slot-scope="list" :vh="30">
        <b>{{list.item.name}}</b><i>{{list.item.arg}}</i>
      </ScrollerViewItem>
    </ScrollerView>
  </div>
</template>



<script>
let data = [
]

export default {
  name: 'app',

  data(){
    return {
      data:data
    }
  },

    mounted(){

      let n=1
      let max = 100
      for(;n<max;n++){
        data.push({
          name:'bbb',
          arg:n
        })
      }
      

    }
  
}
</script>
