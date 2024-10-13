<template>
  <div>
    <h5>CHILD</h5>
    <div>{{ prop1 }}</div>
    <button @click="changeState">button child</button>

    <CompositionChildChild @emitNewProp1Child="changeSteteChild" />
  </div>
</template>

<script>
import { ref } from "vue";
import CompositionChildChild from "./CompositionChildChild.vue";

export default {
  name: "OptionChild",
  components: {
    CompositionChildChild,
  },
  props: {
    prop1: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    // State
    const newProp1 = ref("data from child composition");

    // Method to emit the event
    const changeState = () => {
      context.emit("emitNewProp1", newProp1.value);
    };
    const changeSteteChild = (newProp1) => {
      context.emit("emitNewProp1Child", newProp1);
    };

    // Return values for template
    return {
      newProp1,
      changeState,
      changeSteteChild,
    };
  },
};
</script>

<style></style>
