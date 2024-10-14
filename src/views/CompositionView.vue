<template>
  <LayoutDashboard>
    <div>{{ name }}</div>
    <hr />

    <h4>METHOD</h4>
    <button v-on:click="getName">change</button><br />
    <hr />

    <h4>DATA BINDING</h4>
    <a target="_blank" :href="url">go to detik</a>
    <hr />

    <h4>TWO-WAY DATA BINDING</h4>
    <input type="text" v-model="name2" />
    {{ name2 }}
    <hr />

    <h4>LOOP AND CONDITION</h4>
    <h5 v-if="products.length === 0">There is no data available</h5>
    <table v-else border="1" style="margin: 0 auto">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
    <hr />

    <h4>LIFECYCLE HOOK</h4>
    <hr />

    <h4>COMPUTED PROPERTY</h4>
    <input type="text" v-model="search" />
    <h5 v-if="products.length === 0">There is no data available</h5>
    <table v-else border="1" style="margin: 0 auto">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in cariData" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
    <hr />

    <h4>COMPONENTS AND PROPS</h4>
    <CompositionChild
      :prop1="prop1"
      @emitNewProp1="changeProp1"
      @emitNewProp1Child="changeProp1Child"
    />
  </LayoutDashboard>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import CompositionChild from "@/components/CompositionChild.vue";
import LayoutDashboard from "@/components/LayoutDashboard.vue";

export default {
  name: "OptionView",
  components: {
    CompositionChild,
    LayoutDashboard,
  },
  setup() {
    // State
    const name = ref("diky satria");
    const url = ref("https://www.detik.com");
    const name2 = ref("budi");
    const products = ref([]);
    const search = ref("");
    const prop1 = ref("prop 1");

    // Methods
    const getName = () => {
      name.value = "ramadanu";
    };

    const changeProp1 = (newProp1) => {
      prop1.value = newProp1;
    };
    const changeProp1Child = (newProp1) => {
      prop1.value = newProp1;
    };

    // Computed
    const cariData = computed(() =>
      products.value.filter((product) => {
        return product.name.includes(search.value);
      })
    );

    // Lifecycle Hook (onMounted replaces created in Composition API)
    onMounted(() => {
      products.value = [
        { id: 1, name: "baju", price: 10000 },
        { id: 2, name: "celana", price: 20000 },
        { id: 3, name: "sepatu", price: 30000 },
        { id: 4, name: "meja", price: 50000 },
        { id: 5, name: "kursi", price: 80000 },
      ];
    });

    // Returning values for template
    return {
      name,
      url,
      name2,
      products,
      search,
      prop1,
      getName,
      changeProp1,
      cariData,
      changeProp1Child,
    };
  },
};
</script>

<style></style>
