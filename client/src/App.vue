<style>

.v-application--wrap{
background: #1D2733;
}
header{
  width:100%;
  height:75px;
  position: relative;
    z-index: 100;
    color: #fff;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    background: #2493cd;
    border-bottom: 2px solid #1D88BF;
    border-top: 3px solid #E8A700;
}
.text{
  line-height: 75px;
    font-size: 20px;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
}
</style>

<template>
<div>
<header><p class="text">You can manage your users here</p></header>
<div class="container">
  <v-app>
     <router-view/>
  </v-app>
  </div>
  </div>
</template>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
