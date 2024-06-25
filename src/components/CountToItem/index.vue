<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  total: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div>
    <span class="block text-lg text-[#697086]" v-text="title" />
    <count-to
      :start-val="0"
      :end-val="total"
      :duration="1000"
      class="text-xl font-bold"
    />
  </div>
</template>

<style scoped>

</style>
