<template>
    <span>{{ date }}</span>
</template>
  
  <script lang="ts">
  import { defineComponent, computed, ref } from "vue";
  import dayjs from "dayjs";
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime)

  export default defineComponent({
    props: {
        publishedAt: String,
    },
    setup(props) {
      
      console.log(props.publishedAt)
  
      const date = computed<string>((): string => {
        // return dayjs(date_example.value).format('MM/DD/YYYY HH:mm');
        return dayjs(props.publishedAt).fromNow();
      });
  
      return {
        dayjs,
        date,
      }
    }
  });
  </script>