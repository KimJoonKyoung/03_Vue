<template>
  <div>
    <!-- icon 이라는 이름의 슬롯을 받아옴 -->
    <slot name="icon"></slot>
    <input
      type="checkbox"
      :value="id"
      :checked="checked"
      @change="$emit('check-changed', { id, checked: $event.target.checked })"
    />
    <!-- label 이라는 이름의 슬롯을 받아옴 -->
    <slot name="label">Item</slot>
  </div>
</template>

<script>
export default {
  name: 'CheckBox3',
  props: ['id', 'checked'],
};
</script>
