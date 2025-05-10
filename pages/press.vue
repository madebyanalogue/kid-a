<template>
  <section class="p-fluid">
    <h1>Press</h1>
    <div class="posts">
      <article v-for="post in posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const posts = [
  { id: 1, title: 'First Press Post', summary: 'Summary of the first press post.' },
  { id: 2, title: 'Second Press Post', summary: 'Summary of the second press post.' },
];
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.post h2 {
  margin-bottom: 0.5rem;
}
</style> 