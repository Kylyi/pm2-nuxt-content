<script setup lang="ts">
const docs = (await queryContent().findOne()).title
console.log('Log ~ docs:', docs)
</script>

<template>
  <main>
    <ContentDoc />
  </main>
</template>

