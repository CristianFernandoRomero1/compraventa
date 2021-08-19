<template>

    <v-layout align-start>
      <v-flex>
    <!-- <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Categoría</th>
            <th class="text-left">Artículo</th>
            <th class="text-left">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in articulos" :key="item.articulos"> 
            <td>{{ item.articulos.nombre }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.descripcion }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->
       
    <v-card>
        <v-card-title>

            <v-card-title>Artículos</v-card-title>
            <v-btn @click="crearPDF()"><v-icon>mdi-printer</v-icon></v-btn>
             <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
<v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                        Nuevo ítem
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.codigo" label="Código"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.descripcion" label="Descripcion"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.stock" label="Stock"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.precio" label="Precio"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.estado" label="Estado"></v-text-field>
                                </v-col>
                                <!--  -->
                             
                                <v-col cols="6">
                                    <v-select v-model="editedItem.categoria" :hint="`${editedItem.categoria.nombre}, ${editedItem.categoria._id}`" :items="categorias" item-text="nombre" item-value="_id" label="Categoría" persistent-hint return-object single-line></v-select>
                                </v-col>
                                <!--  -->
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                            Cancelar
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="headline">Estás seguro que quieres eliminar este ítem?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!--  -->
        </v-card-title>
        <v-data-table :headers="headers" :items="articulos" :search="search" sort-by="codigo" class="elevation-1">
  <template v-slot:[`item.estado`]="{ item }">
                    <div v-if="item.estado">
                        <span class="blue--text">Activo</span>
                    </div>
                    <div v-else>
                        <span class="red--text">Inactivo</span>
                    </div>
                </template>
            <!-- <template v-slot:item.actions="{ item }"> -->
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                      <template v-if="item.estado">
                    <v-icon small @click="activarDesactivarMostrar(2, item)">
                        mdi-block-helper
                    </v-icon>
                </template>
                <template v-else>
                    <v-icon small @click="activarDesactivarMostrar(1, item)">
                        mdi-check
                    </v-icon>
                </template>
                
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>

        </v-data-table>
    </v-card>
    </v-flex>
      </v-layout>

</template>

<script>
import axios from 'axios'
import '@mdi/font/css/materialdesignicons.css' 
import jsPDF from 'jspdf'
import 'jspdf-autotable'
export default {
    name: "Articles",
    props: {},
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [{
                text: 'Código',
                value: 'codigo',
                align: 'start',
                sortable: true,
            },
            {
                text: 'Artículos',
                value: 'nombre',

            },
            {
                text: 'Categoría',
                value: 'categoria.nombre',

            },
            {
                text: 'Descripción',
                value: 'descripcion'
            },
            {
                text: 'Stock',
                value: 'stock'
            },
            {
                text: 'Precio',
                value: 'precio'
            },
            {
                text: 'Estado',
                value: 'estado'
            },
            {
                text: 'Acciones',
                value: 'actions',
                sortable: false
            },
        ],
        articulos: [],
        categorias: [],
        editedIndex: -1,
        editedItem: {
            codigo:'',
            nombre: '',
            descripcion: '',
            categoria: [],
            estado:''
        },
        defaultItem: {
            codigo:'000',
            nombre: '',
            descripcion: '',
            categoria: [],
            estado:1
        },

        payload: '',
        id: 0,
        select: {
            nombre: '',
            _id: ''
        },

    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        }
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.articulos = []
            var mytoken = localStorage.getItem("user-token")
            axios({
                    url: "articulo/",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: mytoken, //the token is a variable which holds the token
                    },
                })
                .then((resp) => {

                    //console.log(resp.data.articulos[0])
                    this.articulos = resp.data.articulos;
                    this.categorias = resp.data.categorias;
                    console.log(this.categorias)
                    console.log(this.articulos)

                })
                .catch((err) => {
                    console.log(err);
                });
        },

        editItem(item) {
            this.editedIndex = this.articulos.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.articulos.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
  activarDesactivarMostrar(accion, item) {
            this.editedIndex = this.articulos.indexOf(item)
            
            console.log(accion)
            var mytoken = localStorage.getItem("user-token")
                let me = this;
           
            if (accion == 2) {
        
                axios({
                        url: "articulo/" + this.articulos[this.editedIndex]._id,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            token: mytoken, //the token is a variable which holds the token
                        },
                        data:{estado:0}
                    })
                    .then((resp) => {
                        console.log(resp.data.categoria)
                        //this.categoria = resp.data.categoria;
                        console.log(this.categoria)
                        me.initialize();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else if (accion == 1) {
              
            
                axios({
                        url: "articulo/" + this.articulos[this.editedIndex]._id,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            token: mytoken, //the token is a variable which holds the token
                        },
                        data:{estado:1}
                    })
                    .then((resp) => {
                        console.log(resp.data.categoria)
                        //this.categoria = resp.data.categoria;
                        console.log(this.categoria)
                        me.initialize();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        deleteItemConfirm() {

            var mytoken = localStorage.getItem("user-token")
            axios({
                    method: "DELETE",
                    url: "articulo/" + this.articulos[this.editedIndex]._id,
                    headers: {
                        'Content-Type': 'application/json',
                        token: mytoken, //the token is a variable which holds the token
                    },
                })
                .then((resp) => {
                    console.log(resp.data.articulos)
                    this.initialize()
                    //this.articulos = resp.data.articulos;
                })
                .catch((err) => {
                    console.log(err);
                });
            //this.articulos.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1

            })
        },

        save() {
            var mytoken = localStorage.getItem("user-token")
            if (this.editedIndex > -1) {
                Object.assign(this.articulos[this.editedIndex], this.editedItem);
                this.payload = this.articulos[this.editedIndex];
                this.id = this.articulos[this.editedIndex]._id;

                var url =
                    "articulo/" +
                    this.id;
                axios({
                        url: url,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            token: mytoken, //the token is a variable which holds the token
                        },

                        data: this.payload

                    })
                    .then((resp) => {
                        console.log(resp.data.articulos)
                        //this.articulos = resp.data.articulos;
                        console.log(this.articulos)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.articulos.push(this.editedItem);
                this.payload = this.articulos[this.articulos.length - 1]

                //var mytoken = localStorage.getItem("user-token")
                console.log(this.payload)
                console.log(this.articulos[this.editedIndex])
                console.log(this.articulos)
                console.log(this.editedIndex)
                axios({
                        method: "POST",
                        url: "articulo/",
                        headers: {
                            'Content-Type': 'application/json',
                            token: mytoken, //the token is a variable which holds the token
                        },
                        data: this.payload,
                    })
                    .then(() => {
                        //this.articulos = resp.data.articulos;
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }

            ////
            this.close()
        },
        //
        crearPDF() {
      var columns = [
        { title: "Nombre", dataKey: "nombre" },
        { title: "Código", dataKey: "codigo" },
        { title: "Categoría", dataKey: "categoria" },
        { title: "Stock", dataKey: "stock" },
        { title: "Precio", dataKey: "precio" },
       
      ];
      var rows = [];

      this.articulos.map(function (x) {
        rows.push({
          nombre: x.nombre,
          codigo: x.codigo,
          categoria: x.categoria.nombre,
          /* descripcion: x.descripcion, */
          stock:x.stock,
          precio:x.precio
        });
      });
      var doc = new jsPDF("p","pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Artículos", 40, 30);
        },
      });

      doc.save("Articulos.pdf");
    },
        ///
    },
};
</script>

<style scoped>
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
