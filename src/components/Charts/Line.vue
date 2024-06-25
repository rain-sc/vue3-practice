<script setup lang="ts">
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: 'lineChart',
  },
  className: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '200px',
    required: true,
  },
  height: {
    type: String,
    default: '200px',
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  declarationTotal: {
    type: Number,
    default: 0,
  },
  toDeclareTotal: {
    type: Number,
    default: 0,
  },
  declaringTotal: {
    type: Number,
    default: 0,
  },
  declaredTotal: {
    type: Number,
    default: 0,
  },
})

const chart = ref<any>('')

onMounted(() => {
  chart.value = markRaw(
    echarts.init(document.getElementById(props.id) as HTMLDivElement),
  )

  chart.value.setOption(props.options)

  window.addEventListener('resize', () => {
    chart.value.resize()
  })
})

onActivated(() => {
  if (chart.value)
    chart.value.resize()
})
</script>

<template>
  <el-card>
    <template #header>
      <span class="text-xl" v-text="title" />
    </template>
    <div class="flex gap-5">
      <div class="w-[240px]">
        <count-to-item
          title="申報人數"
          :total="declarationTotal"
        />
        <div class="mt-4">
          <div class="flex flex-wrap gap-5 bg-[#f5f6f8] justify-between p-5">
            <count-to-item
              title="待申報(人)"
              :total="toDeclareTotal"
            />
            <count-to-item
              title="申報中(人)"
              :total="declaringTotal"
            />
            <count-to-item
              title="已申報(人)"
              :total="declaredTotal"
            />
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div :id="id" :class="className" :style="{ height, width }" />
      </div>
    </div>
  </el-card>
</template>

<style scoped>

</style>
