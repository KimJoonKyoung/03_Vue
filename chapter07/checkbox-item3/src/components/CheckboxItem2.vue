<template>
  <li><input type="checkbox" :checked="idol.checked" />{{ idol.name }}</li>
</template>

<script>
export default {
  name: 'CheckboxItem2',
  // props : 부모 컴포넌트한테 받아온 속성
  // 받아올 속성이 많은 경우 객체를 통째로 넘겨준다
  props: ['idol'],
};
</script>
