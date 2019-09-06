<template>
  <div>
    <adminMenu></adminMenu>
    <SliderText link="Admin"/>
    <v-container>
      <v-layout mb-4>
        <v-flex>
          <h2 class="display-1">Administración</h2>
        </v-flex>
      </v-layout>
      <v-layout class="text-xs-center" justify-center row>
        <v-flex lg6 md6 sm10 xs10>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field required
              v-model="name"
              :counter="20"
              :rules="nameRules"
              label="Nombre"
            ></v-text-field>

            <v-text-field
              v-model="nameComplete"
              :counter="35"
              :rules="nameCompleteRules"
              label="Nombre Completo"
              required
            ></v-text-field>
            <div class="content-file">
              <input
                type="file"
                accept="image/*"
                @change="onFileSeleted"
                required
                id="file-7" class="inputfile inputfile-6"
              >
              <label for="file-7" class="content-file__label"><span>{{seletedFileName}}</span> <strong><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> Selecionar archivo&hellip;</strong></label>
            </div>
             <v-progress-linear
              color="success"
              height="15"
              :value="uploadValue"
              max="100"
            ></v-progress-linear>

            <v-text-field
              v-model="date"
              type="date"
              label="Fecha"
              required
            ></v-text-field>

            <v-select
              :items="category"
              v-model="categoryValue"
              attach
              chips
              label="categoria"
              :rules="categoryRules"
              multiple
            ></v-select>

            <v-text-field
              v-model="link"
              label="Link opcional"
              required
            ></v-text-field>
            <v-textarea
               label="Descripción"
              value=""
              v-model="description"
              hint="Concepto"
              :counter="215"
              :rules="descriptionRules"
              required
            ></v-textarea> 
            <v-btn
              :disabled="!valid"
              color="success"
              @click="addGallery"
            >
              Agregar
            </v-btn>
          </v-form>
           <v-alert
              :value="true"
              type="error"
              v-show="messageErrorShow"
            >
              {{errors}}
            </v-alert>  
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SliderText from '@/components/Slider-text.vue'
import adminMenu from '@/components/admin/Admin-menu.vue'
import { db } from '@/main'
import firebase from 'firebase'
  export default {
    name:'admin',
    components:{adminMenu,SliderText},
    data(){
      return {
        valid: true,
        name: '',
        nameComplete:'',
        description:'',
        date:'',
        link:'',
        errors:'',
        seletedFile:null,
        seletedFileName:'',
        picture:null,
        category: ['paisajes', 'flora', 'fauna'],
        categoryValue: null,
        uploadValue:0,
        messageErrorShow:false,
        nameRules: [
          v => !!v || 'Nombre es requerido',
          v => (v && v.length <= 20) || 'El nombre debe tener menos de 10 caracteres'
        ],
         nameCompleteRules: [
          v => !!v || 'Nombre completo es requerido',
          v => (v && v.length <= 35) || 'El nombre Completo debe tener menos de 20 caracteres'
        ],
        descriptionRules: [
          v => !!v || 'Descripción  es requerido',
          v => (v && v.length <= 215) || 'La descripción debe tener menos de 215 caracteres'
        ],
        categoryRules: [
          v => !!v || 'Categoria  es requerida',
        ]
      }
    },
    mounted(){
        //  if(this.errors !== ''){
        //   return this.messageErrorShow = true
        // }
    },
    methods:{
       onFileSeleted(event){
        this.seletedFile = event.target.files[0]
        this.seletedFileName = event.target.files[0].name       
      },
      addGallery(){
        this.errors = ''
        this.picture = null
        if (this.name !== '' &&  this.nameComplete !== '' && this.description !== '' && this.date !== '' && this.seletedFile !== null && this.categoryValue !== null) {
          const storageRef = firebase.storage().ref('imagenes/'+ this.seletedFile.name);
          const task = storageRef.put(this.seletedFile)
          task.on('state_changed',snapshot => {
          let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100
          this.uploadValue = percentage
          },
          error => {
          this.errors ="Por favor complete todos los datos"
          },
          () => {
            this.uploadValue=100
            //downloadULR
            task.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture = url
            db.collection('gallery').add({
              name: this.name,
              nameComplete: this.nameComplete,
              description: this.description,
              date:this.date,
              imageStorage:this.picture,
              link:this.link,
              categoryValue:this.categoryValue
            }).then((res) => {
              // console.log("Documento con ID: ", res.id); 
              // console.log("url image: ", this.picture);    
              if (res) {
                this.name = '',
                this.nameComplete ='',
                this.seletedFileName = '',
                this.description = '',
                this.date = '',
                this.link = '',
                this.categoryValue = null,
                this.uploadValue=0             
              }
            }).catch((error) => {
              this.errors = error
            })
            }) 
          })
        } else {
          this.errors = 'Por favor complete todos los datos'
          this.messageErrorShow = true
          setTimeout(() => this.messageErrorShow = false, 2000);   
        }
      }
    },
    computed:{
      // messageError(){
      //     if(this.errors !== ''){
      //         this.messageErrorShow = true
      //         return setTimeout(() => this.messageErrorShow = false, 2000);
      //     }
      // }
    }
  }
</script>

<style lang="scss" scoped>

.inputfile{
  width: 100%;
  display:none;
}
.content-file__label{
  width: 100%;
  border-radius: .3rem;
  & strong{
    float:right;
    @media screen and (max-width:960px) {
      float:none;
    }
  }
  margin-top: 1.5rem;
}
.inputfile + label {
    max-width: 100%;
    font-size: 1.25rem;
    /* 20px */
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 0.625rem 1.25rem;
    /* 10px 20px */
}


.inputfile:focus + label,
.inputfile.has-focus + label {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
}


.inputfile + label svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    /* 4px */
    margin-right: 0.25em;
    /* 4px */
}


/* style 6 */

.inputfile-6 + label {
    color: #d3394c;
}

.inputfile-6 + label {
    // border: 1px solid #1B5E20;
    background-color: #f1e5e6;
    padding: 0;
}

.inputfile-6:focus + label,
.inputfile-6.has-focus + label,
.inputfile-6 + label:hover {
    border-color: #1B5E20;
}

.inputfile-6 + label span,
.inputfile-6 + label strong {
    padding: 0.625rem 1.25rem;
    /* 10px 20px */
}

.inputfile-6 + label span {
    width: 200px;
    min-height: 2em;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: top;
}

.inputfile-6 + label strong {
    height: 100%;
    color: #fff;
    background-color: #04BF68;
    display: inline-block;
}

.inputfile-6:focus + label strong,
.inputfile-6.has-focus + label strong,
.inputfile-6 + label:hover strong {
    background-color: #004D40;
}

@media screen and (max-width: 50em) {
	.inputfile-6 + label strong {
		display: block;
	}
}

</style>