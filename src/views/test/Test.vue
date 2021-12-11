<template>
  <div >
    <svg-icon iconName="task"></svg-icon>
    <svg-icon iconName="notify"></svg-icon>
    <svg-icon iconName="ipv6" className="blue"></svg-icon>
    <svg-icon iconName="user"></svg-icon>
    <svg-icon iconName="user_settings" className="blue"></svg-icon>    
    <div></div>
    <p>fdsfdsfdfd</p>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.svg-icon {
  font-size: 40px;
}
.icon-tools,
.icon-ipv6 {
  font-size: 100px;
}
.icon-user {
  color: red;
}
.blue {
  color: rgb(14, 14, 223);
}
</style>
