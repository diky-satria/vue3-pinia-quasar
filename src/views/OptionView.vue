<template>
  <div>
    <h4>STATE</h4>
    <div>{{ name }}</div>
    <hr />

    <h4>METHOD</h4>
    <button v-on:click="getName()">change</button><br />
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
    <OptionChild
      :prop1="prop1"
      @emitNewProp1="changeProp1"
      @emitNewProp1Child="changeProp1Child"
    />
  </div>
</template>

<script>
import OptionChild from "@/components/OptionChild.vue";

export default {
  name: "OptionView",
  components: {
    OptionChild,
  },
  data() {
    return {
      name: "diky satria",
      url: "https://www.detik.com",
      name2: "budi",
      products: [],
      search: "",
      prop1: "prop 1",
    };
  },
  computed: {
    cariData() {
      return this.products.filter((product) => {
        return product.name.includes(this.search);
      });
    },
  },
  created() {
    this.products = [
      { id: 1, name: "baju", price: 10000 },
      { id: 2, name: "celana", price: 20000 },
      { id: 3, name: "sepatu", price: 30000 },
      { id: 4, name: "meja", price: 50000 },
      { id: 5, name: "kursi", price: 80000 },
    ];
  },
  methods: {
    getName() {
      this.name = "ramadanu";
    },
    changeProp1(newProp1) {
      this.prop1 = newProp1;
    },
    changeProp1Child(newProp1) {
      this.prop1 = newProp1;
    },
  },
};
</script>

<style></style>
