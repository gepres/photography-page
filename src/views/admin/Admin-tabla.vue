<template>
  <div>
    <adminMenu></adminMenu>
    <SliderText link="Tabla"/>
    <v-container>
      <!-- START titulo -->
      <v-layout mb-4>
        <v-flex>
          <h2 class="display-1">Tabla</h2>
        </v-flex>
      </v-layout>
      <!-- END titulo -->
      <!-- START content -->
      <v-layout justify-center row>
        <v-flex lg12>
          <v-card>
            <v-card-title>
              Galeria
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="getItems"
              :search="search"
            >
              <template v-slot:items="props">
                <td>{{ props.item.id.substr(0,3) }}</td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.nameComplete }}</td>
                <td class="text-xs-center">{{ props.item.date }}</td>
                <td class="text-xs-center">{{ props.item.imageStorage.substr(8,8) }}</td>
                <td class="text-xs-center">{{ props.item.link !== '' ? 'con enlace' : 'sin enlace ' }}</td>
                <td class="text-xs-center">{{ props.item.categoryValue}}</td>
                <td class="text-xs-center">{{ props.item.description.substr(0,8) }}</td>
                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                   @click="modalDelete(props.item)"
                  >
                    delete
                  </v-icon>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                  Su búsqueda de "{{search}}" no encontró resultados.
                </v-alert>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
        <!-- START Dialog Update -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Editar Foto</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md2>
                    <v-text-field v-model="editedItem.id" label="id" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md10>
                    <v-text-field v-model="editedItem.name" :counter="20" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field v-model="editedItem.nameComplete" :counter="35" label="Nombre Completo"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field type="date" v-model="editedItem.date" label="Fecha"></v-text-field>
                  </v-flex>
                  <!-- <v-flex xs12 sm6 md12>
                    <v-text-field v-model="editedItem.imageStorage" label="URL"></v-text-field>
                  </v-flex> -->
                  <v-flex xs12 sm6 md12>
                    <v-text-field v-model="editedItem.link" label="Enlace opcional"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-select
                      :items="category"
                      v-model="editedItem.categoryValue"
                      attach
                      chips
                      label="categoria"
                      multiple
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-textarea v-model="editedItem.description" :counter="215" label="Descripción"></v-textarea>
                  </v-flex>
                  <!-- START - alerta si no han completado todos los cuadros -->
                  <v-flex xs12 sm6 md12>
                    <v-alert :value="true" v-show="alertUpdate" color="error" icon="warning" outline>
                      Debe completar todos los campos
                    </v-alert>
                  </v-flex>
                  <!-- END - alerta si no han completado todos los cuadros -->
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="guardar(editedItem.id,editedItem.name,editedItem.nameComplete,editedItem.date,editedItem.description,editedItem.link,editedItem.categoryValue)">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- END Dialog Update -->
        <!-- START dialog delete -->
        <v-dialog v-model="dialogDelete" width="500">
          <v-card>
            <v-card-title class="headline red lighten-2" primary-title>
              Eliminar Foto
            </v-card-title>
            <v-card-text>
              Desea eliminar a {{editedItem.name}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn color="error" flat @click="deleteItem(editedItem)">
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- END dialog delete -->
      </v-layout>
      <!-- START content -->
    </v-container>
  </div>
</template>

<script>
import SliderText from '@/components/Slider-text.vue'
import adminMenu from '@/components/admin/Admin-menu.vue'
import firebase from 'firebase'
import { db } from '@/main'
import { mapGetters } from 'vuex'
  export default {
    name:'admin-tabla',
    components:{adminMenu,SliderText},
    beforeCreate() {
     this.$store.dispatch('setItems')
    },
    data(){
      return{
        alertUpdate:false,
        search: '',
        dialog: false,
        dialogDelete:false,
        editedItem: {
          name: '',
          nameComplete:'',
          imageStorage:null,
          date:'',
          link:'',
          description:'',
          categoryValue:null
        },
        category: ['paisajes', 'flora', 'fauna'],
        headers: [
          {
            text: 'Id',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: 'Nombres', align: 'center', value: 'name' },
          { text: 'Nombres Completo', align: 'center',value: 'nameComplete' },
          { text: 'Fecha', align: 'center', value: 'date' },
          { text: 'Imagen', align: 'center', value: 'image' },
          { text: 'Enlace', align: 'center', value: 'link' },
          { text: 'Categoria', align: 'center', value: 'categoryValue' },
          { text: 'Descripción', align: 'center', value: 'description' },
          { text: 'Acciones', value: 'id',sortable: false, }
        ],
      }
    },
    methods:{
      close () {
        this.dialog = false
      },
      editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      modalDelete(item){
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItem(item){
        const storageRef = firebase.storage()
        storageRef.refFromURL(item.imageStorage).delete().then(() =>{
            console.log('se elimino la imagen', item.imageStorage);    
        }).catch(function(error) {
            console.log('error');   
        });
         db.collection("gallery").doc(item.id).delete().then(() => {
          console.log(`tu id eliminado es ${item.id} y ${item.name} `);
          this.dialogDelete = false
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      },
      guardar(id,name,nameComplete,date,description,link){
        if(this.editedItem.name !== '' &&  this.editedItem.nameComplete !== '' && this.editedItem.description !== '' && this.editedItem.date !== ''){
          var galleryRef = db.collection("gallery").doc(id);
        return galleryRef.update({
          name:name,
          nameComplete:nameComplete,
          date:date,
          description:description,
          link:link,
          categoryValue:categoryValue
        }).then(() => {
          console.log("Documento actualizado con éxito!");
          this.dialog = false
        })
        .catch(function(error) {
            console.error("Error al actualizar el documento: ", error);
        });
        }else{
           this.alertUpdate = true
          setTimeout(() => this.alertUpdate = false, 2000);
        }
      }
    },
    computed:mapGetters(['getItems'])
  }
</script>

<style lang="scss" scoped>

</style>