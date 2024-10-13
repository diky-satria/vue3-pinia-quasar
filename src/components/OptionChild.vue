<template>
  <div>
    <h5>CHILD</h5>
    <div>{{ prop1 }}</div>
    <button @click="changeState">button child</button>

    <OptionChildChild @emitNewProp1Child="changeSteteChild" />
  </div>
</template>

<script>
import OptionChildChild from "./OptionChildChild.vue";
export default {
  name: "OptionChild",
  props: ["prop1"],
  components: {
    OptionChildChild,
  },
  data() {
    return {
      newProp1: "data from child option",
    };
  },
  methods: {
    changeState() {
      this.$emit("emitNewProp1", this.newProp1);
    },
    changeSteteChild(newProp1) {
      this.$emit("emitNewProp1Child", newProp1);
    },
  },
};
</script>

<style></style>
