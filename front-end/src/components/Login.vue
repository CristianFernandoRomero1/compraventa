<template>
  <!--  <div data-app class="login"> -->
<!-- <v-app id="app">  -->
  <!-- 
  <v-layout align-center justify-center>
    
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12" sm="4"> </v-col>
        <v-col cols="12" sm="4">
          <v-container fluid fill-height class="login">
            <v-layout flex align-center justify-center>
              <v-flex>
                <v-toolbar class="pt-5 blue darken-4">
                  <v-toolbar-title class="white--text"
                    ><h4>Login</h4></v-toolbar-title
                  >
                </v-toolbar>

                <v-form>
                  <v-container>
                    <v-text-field label="Email" v-model="email"></v-text-field>
                  </v-container>
                  <v-container>
                    <v-text-field
                      label="Password"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                  </v-container>
                  <v-btn @click="login" depressed> Sign in </v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-col>
        <v-col cols="12" sm="4"> </v-col>
      </v-row>
    </v-container>
    
    </v-layout>
     -->
 <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        Acceso al Sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="email" autofocus color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="login()" color="primary">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
<!--   </v-app>  -->
</template>

<script>
import axios from "axios"

export default {
  name: "Login",
  props: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      ///
      var payload = { email: this.email, password: this.password };
      axios({
        url: "usuario/login", //http://localhost:5000/api/
        data: payload,
        method: "POST",
      })
        .then((resp) => {
          if (resp.status === 200) {
            var token = resp.data.token;
            //this.$store.dispatch("setToken", resp.data.token)
            this.$store.dispatch("guardarToken",resp.data);
            localStorage.setItem("user-token", token); // store the token in localstorage
            console.log(this.$store.state.token)
  
            this.$router.push("/homepage");
            // console.log(this.$router.currentRoute.fullPath);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
        });

      ///
    },
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      //var mytoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDgwZGNmYWNjODAyOTIzZTQ2N2E1NzMiLCJpYXQiOjE2MTk5MDM3MTksImV4cCI6MTYyMDUwODUxOX0.xULcqEM31DJKFKwT8j3kARJtNA2L3e86UNx7VfuMgD0"; 
      var mytoken = localStorage.getItem("user-token")
      axios({
        url: "usuario/token",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          token: mytoken, //the token is a variable which holds the token
          frontend: 1
        },
      })
        .then((resp) => {
          if (resp.status === 200) {
            this.$router.push("/homepage");
            
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
        });
    });
  },
};
</script>

<style scoped>
/* #login {
  left: 50%;
  top: 40%;
  position: absolute;
  transform: translate(-50%, -50%);
  display: inline-block;
  text-align: center;
} */

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
