      <!-- <v-toolbar flat color="white"> -->
<!-- <div data-app class="category"> -->
<template>
<v-layout align-start>
    <v-flex>
    <v-card>
        <v-card-title>

            <v-card-title>Categorías</v-card-title>
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
                                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.descripcion" label="Descripcion"></v-text-field>
                                </v-col>
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
        <v-data-table :headers="headers" :items="categoria" :search="search" sort-by="nombre" class="elevation-1">
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
<!-- </div> -->
     
   </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    name: "Category",
    props: {},
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [{
                text: 'Categoría',
                align: 'start',
                sortable: false,
                value: 'nombre',
            },
            {
                text: 'Descripción',
                value: 'descripcion'
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
        categoria: [],
        editedIndex: -1,
        editedItem: {
            nombre: '',
            descripcion: '',
        },
        defaultItem: {
            nombre: '',
            descripcion: '',
        },
        payload: '',
        id: 0,
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
            this.categoria = []
            var mytoken = localStorage.getItem("user-token")
            axios({
                    url: "categoria/",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: mytoken, //the token is a variable which holds the token
                    },
                })
                .then((resp) => {
                    if (resp.status === 200) {
                        console.log(resp.data.categoria[0])
                        this.categoria = resp.data.categoria;
                        console.log(this.categoria)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        editItem(item) {
            this.editedIndex = this.categoria.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.categoria.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        activarDesactivarMostrar(accion, item) {
            this.editedIndex = this.categoria.indexOf(item)

            console.log(accion)
            var mytoken = localStorage.getItem("user-token")
            let me = this;

            if (accion == 2) {

                axios({
                        url: "categoria/desactivar/" + this.categoria[this.editedIndex]._id,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            token: mytoken, //the token is a variable which holds the token
                        },

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
                        url: "categoria/activar/" + this.categoria[this.editedIndex]._id,
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            token: mytoken, //the token is a variable which holds the token
                        },
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
                    url: "categoria/" + this.categoria[this.editedIndex]._id,
                    headers: {
                        'Content-Type': 'application/json',
                        token: mytoken, //the token is a variable which holds the token
                    },
                })
                .then((resp) => {
                    console.log(resp.data.categoria)
                    //this.categoria = resp.data.categoria;
                })
                .catch((err) => {
                    console.log(err);
                });
            this.categoria.splice(this.editedIndex, 1)
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
                Object.assign(this.categoria[this.editedIndex], this.editedItem);
                this.payload = this.categoria[this.editedIndex];
                this.id = this.categoria[this.editedIndex]._id;

                var url =
                    "categoria/" +
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
                        console.log(resp.data.categoria)
                        //this.categoria = resp.data.categoria;
                        console.log(this.categoria)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.categoria.push(this.editedItem);
                this.payload = this.categoria[this.categoria.length - 1]

                //var mytoken = localStorage.getItem("user-token")
                console.log(this.payload)
                console.log(this.categoria[this.editedIndex])
                console.log(this.categoria)
                console.log(this.editedIndex)
                axios({
                        method: "POST",
                        url: "categoria/",
                        headers: {
                            'Content-Type': 'application/json',
                            token: mytoken, //the token is a variable which holds the token
                        },
                        data: this.payload,
                    })
                    .then((resp) => {
                        console.log(resp.data.categoria)
                        //this.categoria = resp.data.categoria;
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }

            ////
            this.close()
        },
    },

}
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
