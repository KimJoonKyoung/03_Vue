<template>
  <div>
    X : <input type="text" v-model.number="x" /> <br />

    <div>결과 : {{ result }}</div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'Calc5',
  setup() {
    const x = ref(0);
    const result = ref(0);
    // 첫 번째 인자 : 감시하고 싶은 데이터 (반응성 데이터)
    // 두 번째 인자 : 현재 값과 전의 값을 받아서 실행할 함수
    watch(x, (current, old) => {
      console.log(`${old} -> ${current}`);
      result.value = current * 2;
    });
    return { x, result };
  },
};
</script>
