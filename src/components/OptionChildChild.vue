<template>
  <div>
    <h5>CHILD 2</h5>
    <button @click="changeState">change button child child</button>
  </div>
</template>

<script>
export default {
  name: "OptionChildChild",
  data() {
    return {
      newProp1: "data from child child option",
    };
  },
  methods: {
    changeState() {
      this.$emit("emitNewProp1Child", this.newProp1);
    },
  },
};
</script>

<style></style>
