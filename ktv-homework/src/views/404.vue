<template>
  <div class="notfound">
    <img src="../assets/404.gif" alt>
  </div>
</template>
<style scoped>
.notgound {
  width: 50%;
  height: 50%;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
}
img {
  width: 50%;
  height: 50%;
  display: inline-block;
  margin: 0 auto;
  position: relative;
  animation: myfirst 5s infinite alternate;
  -moz-animation: myfirst 5s; /* Firefox */
  -webkit-animation: myfirst 5s; /* Safari and Chrome */
  -o-animation: myfirst 5s; /* Opera */
}
@keyframes myfirst
{
0%   {background:url(../assets/404.gif); left:0px; top:0px;}
25%  {background:url(../assets/404.gif); left:200px; top:0px;}
50%  {background:url(../assets/404.gif); left:200px; top:200px;}
75%  {background:url(../assets/404.gif); left:0px; top:200px;}
100% {background:url(../assets/404.gif); left:0px; top:0px;}
}
 
@-moz-keyframes myfirst /* Firefox */
{
0%   {background:url(../assets/404.gif); left:0px; top:0px;}
25%  {background:url(../assets/404.gif); left:200px; top:0px;}
50%  {background:url(../assets/404.gif); left:200px; top:200px;}
75%  {background:url(../assets/404.gif); left:0px; top:200px;}
100% {background:url(../assets/404.gif); left:0px; top:0px;}
}
 
@-webkit-keyframes myfirst /* Safari and Chrome */
{
0%   {background:url(../assets/404.gif); left:0px; top:0px;}
25%  {background:url(../assets/404.gif); left:200px; top:0px;}
50%  {background:url(../assets/404.gif); left:200px; top:200px;}
75%  {background:url(../assets/404.gif); left:0px; top:200px;}
100% {background:url(../assets/404.gif); left:0px; top:0px;}
}
 
@-o-keyframes myfirst /* Opera */
{
0%   {background:url(../assets/404.gif); left:0px; top:0px;}
25%  {background:url(../assets/404.gif); left:200px; top:0px;}
50%  {background:url(../assets/404.gif); left:200px; top:200px;}
75%  {background:url(../assets/404.gif); left:0px; top:200px;}
100% {background:url(../assets/404.gif); left:0px; top:0px;}
}
</style>
