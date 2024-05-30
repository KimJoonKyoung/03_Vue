<template>
  <div>
    X : <input type="text" v-model.number="state.x" /> <br />
    Y : <input type="text" v-model.number="state.y" /> <br />
    <!-- computed 함수로 인해 바뀌는 값에 따라 바로 result 변경 -->
    <div>결과 : {{ result }}</div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: 'Calc4',
  setup() {
    // computed로 계산해주기 때문에 result 초기화 필요 X
    const state = reactive({ x: 10, y: 20 });
    // 기존 옵션 API의 computed 옵션과 동일한 역할
    const result = computed(() => {
      return state.x + state.y;
    });
    return { state, result };
  },
};
</script>
