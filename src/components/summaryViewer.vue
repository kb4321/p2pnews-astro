<template>
  <div class="prose dark:prose-invert max-w-none" v-html="formattedSummary"></div>
</template>

<script>
export default {
  props: {
    formattedSummary: String
  }
}
</script>