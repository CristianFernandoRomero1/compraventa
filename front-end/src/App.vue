<template>
<v-app>
   <v-navigation-drawer
      v-model="drawer"
      app
    >
     <!--  :clipped="$vuetify.breakpoint.lgAndUp"
      v-if="logueado" -->
      <v-list dense>
        <template>
          <v-list-item to="/homepage">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Almacén
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/categorias">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Categorías
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/articulos">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Artículos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Compras
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/ingreso">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Ingresos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/proveedor">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Proveedores
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Ventas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/venta">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Ventas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/cliente">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Clientes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Accesos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/usuario">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Consultas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{name: ''}">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Consulta Compras
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{name: ''}">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Consulta Ventas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>   
      </v-list>
    </v-navigation-drawer>

    <!-- <v-navigation-drawer v-model="drawer" absolute bottom temporary app>
        <v-card class="mx-auto" width="300">
            <v-list>
                <v-list-item-group>
                    <v-list-item :to="home">
                        <v-list-item-title :to="home">Home</v-list-item-title>

                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-item-group>

                <v-list-group :value="false" prepend-icon="mdi-account-circle">
                    <template v-slot:activator>
                        <v-list-item-title>Almacén</v-list-item-title>
                    </template>

                    <v-list-item v-for="([title, icon, enlace], i) in admins" :key="i" link :to="enlace">
                        <v-list-item-title v-text="title" :to="enlace"></v-list-item-title>

                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-account-circle">
                    <template v-slot:activator>
                        <v-list-item-title>Compras</v-list-item-title>
                    </template>

                    <v-list-item v-for="([title, icon, enlace], i) in compras" :key="i" link :to="enlace">
                        <v-list-item-title v-text="title" v-bind:to="enlace"></v-list-item-title>

                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-account-circle">
                    <template v-slot:activator>
                        <v-list-item-title>Ventas</v-list-item-title>
                    </template>

                    <v-list-item v-for="([title, icon, enlace], i) in ventas" :key="i" link :to="enlace">
                        <v-list-item-title v-text="title" v-bind:to="enlace"></v-list-item-title>

                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-account-circle">
                    <template v-slot:activator>
                        <v-list-item-title>Accesos</v-list-item-title>
                    </template>

                    <v-list-item v-for="([title, icon, enlace], i) in accesos" :key="i" link :to="enlace">
                        <v-list-item-title v-text="title" v-bind:to="enlace"></v-list-item-title>

                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-account-circle">
                    <template v-slot:activator>
                        <v-list-item-title>Consultas</v-list-item-title>
                    </template>

                    <v-list-item v-for="([title, icon, enlace], i) in consultas" :key="i" link :to="enlace">
                        <v-list-item-title v-text="title" v-bind:to="enlace"></v-list-item-title>

                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-card>
    </v-navigation-drawer> -->

    <!--  <v-app-bar
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Sistema</span>
      </v-toolbar-title>      
      <v-spacer></v-spacer>
      <v-btn @click="exit"  icon>
        <v-icon>logout</v-icon> Salir
      </v-btn>
     </v-app-bar> -->
    <v-app-bar app color="blue darken-3" dark>
        <v-toolbar-title>  <!-- style="width: 300px" class="ml-0 pl-3" -->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <span class="hidden-sm-and-down">Sistema</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="exit()" icon>
            <v-icon>mdi-export</v-icon> Salir
        </v-btn>

    </v-app-bar>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
<v-main>
        <BarDrawer />
       
          <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
         </v-main>
    </v-app>
</template>

<script>
import BarDrawer from './components/bar_drawer/Bar_drawer.vue'

export default {
    name: 'App',
    components: {
        BarDrawer
    },
    data: () => ({
      drawer: false,
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
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
