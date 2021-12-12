<template>
  <body class="sementic-example-body">
    <header class="sementic-example-header">
      <span>header</span>
      <nav class="sementic-example-nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">profile</a></li>
        </ul>
      </nav>
    </header>
    <main class="sementic-example-main">
      <article class="sementic-example-article">
        article
        <section class="sementic-example-section">section1</section>
        <section class="sementic-example-section">section2</section>
      </article>
      <aside class="sementic-example-aside">aside</aside>
    </main>
    <footer class="sementic-example-footer">footer</footer>
  </body>
</template>

<script>
export default {
  name: "SementicExample"
};
</script>

<style scope>
.sementic-example-body {
  padding: 0;
  margin: 10px;
}
.sementic-example-header {
  height: 50px;
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sementic-example-header span {
  margin-left: 20px;
}
.sementic-example-nav {
  border: 1px solid green;
  height: 30px;
}
.sementic-example-nav ul {
  display: flex;
  margin: 5px 20px 0 0;
  align-items: center;
  justify-content: center;
}
.sementic-example-nav ul li {
  margin-right: 50px;
}
.sementic-example-main {
  border: 1px solid blue;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.sementic-example-article {
  padding: 10px;
  border: 1px solid gray;
  width: 90%;
}
.sementic-example-section {
  padding: 10px;
  border: 1px solid dodgerblue;
  width: 90%;
  margin-bottom: 10px;
  height: 30px;
}
.sementic-example-aside {
  padding: 10px;
  border: 1px solid navy;
  width: 10%;
}
.sementic-example-footer {
  height: 30px;
  border: 1px solid purple;
}
</style>
