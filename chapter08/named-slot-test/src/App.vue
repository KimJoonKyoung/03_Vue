<template>
  <div>
    <SlotTest />
    <NamedSlotTest />
    <ScopedSlotTest />
  </div>
</template>

<script>
import SlotTest from './components/SlotTest.vue';
import NamedSlotTest from './components/NamedSlotTest.vue';
import ScopedSlotTest from './components/ScopedSlotTest.vue';

export default {
  name: 'App',
  components: { SlotTest, NamedSlotTest, ScopedSlotTest },
};
</script>
