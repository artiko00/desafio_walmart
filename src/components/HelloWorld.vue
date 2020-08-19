<template>
  <div class="row mt-3">
    <div class="col">
      <div class="card-columns">
        <div v-for="producto in productos" :key="producto.id" class="card text-center">
           <img :src="'http://'+producto.image" class="card-img-top"/>
          <div class="card-body">
            <h5 class="card-title">{{producto.brand}}</h5>
            <p class="card-text">{{producto.description}}</p>
          </div>
          <div class="card-body" v-if="descuentos">
            <h4>$ {{new Intl.NumberFormat().format(producto.price / 2)}} <b-badge pill variant="danger">50%</b-badge></h4>
            <h5 class="tachado">$ {{new Intl.NumberFormat().format(producto.price)}}</h5>   
          </div>
          <div class="card-body" v-else>
            <h4>$ {{new Intl.NumberFormat().format(producto.price)}}</h4>
          </div>
         </div>
      
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["productos", "descuentos"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tachado {
  text-decoration: line-through;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
