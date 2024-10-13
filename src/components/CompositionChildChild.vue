<template>
  <div>
    <h5>CHILD 2</h5>
    <button @click="changeState">change button child child</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "CompositionChildChild",
  setup(props, context) {
    // State
    const newProp1 = ref("data from child child composition");

    // Method to emit the event
    const changeState = () => {
      context.emit("emitNewProp1Child", newProp1.value);
    };

    // Return values for template
    return {
      newProp1,
      changeState,
    };
  },
};
</script>

<style></style>
