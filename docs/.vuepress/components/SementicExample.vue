<template>
  <body>
    <header class="header">
      <span>header</span>
      <nav class="nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">profile</a></li>
        </ul>
      </nav>
    </header>
    <main class="main">
      <article class="article">
        article
        <section class="section">section1</section>
        <section class="section">section2</section>
      </article>
      <aside class="asice">aside</aside>
    </main>
    <footer class="footer">footer</footer>
  </body>
</template>

<script>
export default {
  name: "SementicExample"
};
</script>

<style scope>
body {
  padding: 0;
  margin: 10px;
}
.header {
  height: 50px;
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header span {
  margin-left: 20px;
}
.nav {
  border: 1px solid green;
  height: 30px;
}
.nav ul {
  display: flex;
  margin: 5px 20px 0 0;
  align-items: center;
  justify-content: center;
}
.nav ul li {
  margin-right: 50px;
}
.main {
  border: 1px solid blue;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.article {
  padding: 10px;
  border: 1px solid gray;
  width: 90%;
}
.section {
  padding: 10px;
  border: 1px solid dodgerblue;
  width: 90%;
  margin-bottom: 10px;
  height: 30px;
}
.aside {
  padding: 10px;
  border: 1px solid navy;
  width: 10%;
}
.footer {
  height: 30px;
  border: 1px solid purple;
}
</style>
