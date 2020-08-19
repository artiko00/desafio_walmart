<template>
  <div class="col">
    <div class="row">
      <div class="col anuncio">
        <div class="row d-flex align-items-center text-center">
          <div class="col-md-8 p-1">
            Servicio al cliente de Lider.cl: WhatsApp
            <a
              href="https://api.whatsapp.com/send?phone=56957211492&text=Hola!%20Tengo%20una%20consulta"
            >+56957211492</a> | Horario: de lunes a viernes de 8:00 a 22:00 y sábado, domingo y festivos de 9:00 a 22:00
          </div>
          <div class="col-md-2">
            <b-icon-calendar2-minus></b-icon-calendar2-minus> agenda tu visita
          </div>
          <div class="col-md-2">
            <b-icon-house></b-icon-house> locales y horarios
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row barra d-flex align-items-center">
          <div class="col-md-1">
            <img :src="logo" alt srcset />
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary btn-block">
              <b-icon-justify></b-icon-justify>Categorías
            </button>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="¿Qué estás buscando?"
                v-model.lazy="busqueda"
              />
              <div class="input-group-append">
                <button @click="realizaBusqueda(busqueda)" class="btn btn-danger">
                  <b-icon-search></b-icon-search>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-1">
            <b-button class="btn btn-warning btn-block">
              <b-icon-cart3></b-icon-cart3>
              <b-badge>0</b-badge>
            </b-button>
          </div>
          <div class="col-md-2">
            <b-button class="btn btn-success btn-block">
              <b-icon-cart4></b-icon-cart4>Supermercado
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="busqueda" v-show="ultimoBuscado !== ''">
          resultados para
          <strong>{{ultimoBuscado}}</strong>
        </p>
      </div>
      <div class="w-100"></div>
      <div class="col">
        <HelloWorld :productos="otrosProductos" :descuentos="aplica_descuento" />
      </div>
      <div class="w-100"></div>
      <div class="col text-center" v-show="otrosProductos.length <= 0">
        <b-jumbotron header="Promoción Líder" lead="Encuentra un palíndromo">
          <p>¡Por qué en líder nos preocupamos por tu bolsillo, te invitamos a participar de este entretenido concurso, si la búsqueda de tu producto es un palíndromo, sea en su nombre, descripción o identificador te realizaremos un descuento!</p>
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import logo from "@/assets/img/logo.svg";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      logo,
      busqueda: "",
      ultimoBuscado: "",
      aplica_descuento: false,
      productos: [],
    };
  },
  computed: {
    ...mapGetters([
      "tenProducts",
      "productsForID",
      "productsForBrandAndDescription",
    ]),
    otrosProductos() {
      const newProductos = [];
      for (const producto of this.productos) {
        newProductos.push(producto);
      }
      return newProductos;
    },
  },
  methods: {
    realizaBusqueda(lobusca) {
      if (lobusca !== "") {
        this.aplica_descuento = false;
        this.ultimoBuscado = JSON.parse(JSON.stringify(lobusca));
        let buscado = JSON.parse(JSON.stringify(lobusca))
          .toLowerCase()
          .split("");
        let alReves = JSON.parse(JSON.stringify(buscado)).reverse().join("");
        buscado = JSON.parse(JSON.stringify(buscado.join("")));
        if (buscado === alReves && lobusca.length >= 3) {
          this.aplica_descuento = true;
        }
        this.busqueda = "";
        if (this.isNumber(lobusca)) {
          this.productos = this.productsForID(Number(lobusca));
        } else {
          this.productos = this.productsForBrandAndDescription(lobusca);
        }
      }
    },
    isNumber(numero) {
      const partes = numero.split("");
      const regex = /[0-9]/;
      for (const parte of partes) {
        if (!regex.test(parte)) {
          return false;
        }
      }
      return true;
    },
  },
  components: {
    HelloWorld,
  },
};
</script>

<style>
@import url("../assets/fonts.css");
html {
  background-color: #f5f5f5;
}
.anuncio {
  background-color: #000915;
  color: white;
  font-family: "Conv_BogleWeb-Regular", Sans-Serif;
  font-size: 12px;
}
.busqueda {
  font-family: "Conv_BogleWeb-Regular", Sans-Serif;
  font-size: 1.5em;
}
.barra {
  background-color: #0071ce;
}
</style>