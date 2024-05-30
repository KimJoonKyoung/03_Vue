<template>
  <div>
    X : <input type="text" v-model.number="state.x" /> <br />

    <div>결과 : {{ state.result }}</div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';

export default {
  name: 'Calc6',
  setup() {
    const state = reactive({ x: 0, result: 0 });
    // 첫 번째 인자로는 반응성 데이터가 와야하기 때문에 state.x 불가능
    // 화살표 함수로 객체 내의 데이터를 접근해야 한다
    watch(
      () => state.x,
      (current, old) => {
        console.log(`${old} -> ${current}`);
        state.result = current * 2;
      }
    );
    return { state };
  },
};
</script>
