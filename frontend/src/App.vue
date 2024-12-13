<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">アップローダー</router-link></li>
          <li><router-link to="/gallery">ギャラリー</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

header {
  background-color: #42b983;
  color: white;
  padding: 10px 0;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav ul li a.router-link-active {
  text-decoration: underline;
}

main {
  padding: 20px;
}
</style>
