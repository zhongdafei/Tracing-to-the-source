<template>
<div class="index">
    <HeaderNav></HeaderNav>
    <div class="rightContainer">
        <router-view></router-view>
    </div>
    
</div>
</template>
<script>

import HeaderNav from "../components/HeaderNav";
export default {
    name: 'index',
    components:{
        HeaderNav,
    }
};
</script>
<style>

.index{
    width: 100%;
    height: 100%;
}
.rightContainer{
    width: 100%;
    height: 100%;
}
</style>
