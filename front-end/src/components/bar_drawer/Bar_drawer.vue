<template>

 <!-- <div data-app class="bardrawer">  -->
   
<!-- 
    <v-toolbar   app
      color="blue darken-3"
      dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Sistema</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="exit" icon>
        <span class="strangeNumbers">
        <v-icon>mdi-export</v-icon>
         Salir
        </span>
        </v-btn>
    </v-toolbar> -->
    
<v-app id="app">
    <!-- <div data-app id="app"> -->


  </v-app>
</template>

<script>
//Hola mundo
export default {
  name: "BarDrawer",
  props: {},
  data: () => ({
    drawer: true,
    group: null,
    idShow: "",
    home: "homepage",
    admins: [
      ["Categorías", "mdi-account-multiple-outline", "categorias"],
      ["Artículos", "mdi-cog-outline", "articulos"],
    ],
    compras: [
      ["Ingresos", "mdi-account-multiple-outline", "ingresos"],
      ["Proveedores", "mdi-account-multiple-outline", "proveedores"],
    ],
    ventas: [
      ["Ventas", "mdi-account-multiple-outline", "ventas"],
      ["Clientes", "mdi-account-multiple-outline", "clientes"],
    ],
    accesos: [
      ["Usuarios", "mdi-account-multiple-outline", "usuarios"],
      ["Clientes", "mdi-account-multiple-outline", "clientes"],
    ],
    consultas: [
      ["Consulta compras", "mdi-account-multiple-outline", "consultacompras"],
      ["Consulta ventas", "mdi-account-multiple-outline", "consultaventas"],
    ],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    exit: function () {
      localStorage.setItem("user-token", null); // store the token in localstorage
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.strangeNumbers {
  word-spacing: 0.1em;
}
h3 {
  margin: 0px 0 0;
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
