<template>
  <div>
    <SliderText link="Galeria"/>
    <v-container pb-0>
      <v-layout>
        <v-flex>
          <h3 class="display-1">Galeria</h3>
          <p class="grey--text darken-1 mt-3 ml-3">Exposición de las fotos.</p>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- GALERY - START -->
    <v-container fluid class="gallery">
        <v-layout align-center justify-center row>
          <v-flex class="menu-isotope">
            <ul>
              <li class="menu-isotope__li" v-for="(val, key) in option.getFilterData"  :key="key" :class="[key === filterOption ? 'is-checked' : '']" @click="filter(key)">
                {{key}}
              </li>
            </ul>
          </v-flex>
      </v-layout>
      <isotope  ref="cpt" @filter="filterOption=arguments[0]" v-images-loaded:on.progress="layout" :list="this.$store.getters.getItems" :item-selector="'element-item'" id="root_isotope" class="row" :options='option'>
        <v-flex v-for="gallery in this.$store.getters.getItems" :class="gallery.categoryValue" :key="gallery.id" lg4 md4 sm6 xs12>
          <v-card class="img">
            <figure class="">
              <img :src="gallery.imageStorage" :alt="gallery.nameComplete" style="max-width: 100%;" />
              <!-- style="max-width: 100%; -->
            </figure>
            <v-card-actions>
              <p><b class="green--text lighten-2">{{gallery.name}}</b></p>
              <v-spacer></v-spacer>
              <v-btn color="success" round @click="editItem(gallery)">detalles</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </isotope>
      <!-- MODAL - START -->
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title class="headline green darken-1 white--text">Fotografía</v-card-title>
        <figure class="dialog-figure">
            <img :src="editedItem.imageStorage" :alt="editedItem.nameComplete"/>
        </figure>
        <!-- <v-img class="white--text" :aspect-ratio="16/9" :src="editedItem.imageStorage" :alt="editedItem.nameComplete">
        <v-card-title class="align-end justify-end  fill-height">Matthews Carbonel</v-card-title>
        </v-img> -->
         <v-card-title class="headline green lighten-5">{{editedItem.name}}</v-card-title>
        <v-card-text primary-title>
            <v-layout wrap>
              <v-flex class="dialog-description" lg6 md6 sm12 xs12>
                <span class="green--text darken-4 subtitle-1 lineheight"><b>Descripción</b></span>
                <br>
                <p  class="ml-4 mr-3">{{editedItem.description}} 
                  <a :href="editedItem.link" class="dialog-description__link" v-show="enlaceShow ? editedItem.link !== '' : enlaceShow = false" target="_black">Enlace adicional</a>
                </p>
              </v-flex>
             <v-flex class="dialog-detalles" lg6 md6 sm12 xs12>
              <span class="green--text darken-4 subtitle-1 lineheight" ><b>Detalles</b></span>
              <br>
              <div style="display:flex;" class="ml-4">
                <div class="dialog-detalles__left">
                  <b><p>Nombre completo<span>:</span></p></b>
                  <b><p>Fecha de publicación<span>:</span></p></b>
                 </div>
                <div class="dialog-detalles__right">
                    <p>{{editedItem.nameComplete}}</p>
                    <p>{{editedItem.date}}</p>
                </div>
              </div>
             </v-flex>
             <v-flex  lg6 md6 sm12 xs12>
                <v-chip label class="green darken-1 ml-0 mr-2" text-color="white" v-for="(item, index) in editedItem.categoryValue" :key="index">
                  <v-icon left>label</v-icon>{{item}}
                </v-chip>
             </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
            class="white--text"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- MODAL - END -->
    </v-container>
    <!-- GALERY - END -->
  </div>
</template>
<script>
import isotope from 'vueisotope'
import imagesLoaded from 'vue-images-loaded'
// components
import SliderText from '@/components/Slider-text.vue'
import cardGallery from '../components/CardGallery'
export default {
  name:'galery',
  components:{
    SliderText,cardGallery,isotope
  },
    directives: {
        imagesLoaded
    },
  beforeCreate: function () {
      // llamas  para usarlo en el componente
    this.$store.dispatch('setItems')
  },
  data(){
    return {
      dialog:false,
      enlaceShow:true,
      selected: null,
      listGallery:this.$store.getters.getItems,
      currentLayout: 'fitRows',
      sortOption: "original-order",
      filterOption: "Todos",
      editedItem: {
        name: '',
        nameComplete:'',
        imageStorage:null,
        date:'',
        link:'',
        description:'',
        categoryValue:null
      },
      option: {
        itemSelector: ".element-item",
        getFilterData: {
          "Todos": () => {
            return true;
           },
          paisajes: (el) => {
            let categoria = el.categoryValue.join('');
            return categoria === "paisajes" || categoria === "paisajesflora" || categoria === "paisajesfauna" || categoria === "florapaisajes" || categoria === "faunapaisajes";
           },
          flora: (el) => {
            let categoria = el.categoryValue.join('');
            return categoria === "flora" || categoria === "florapaisajes" || categoria === "florafauna" || categoria === "paisajesflora" || categoria === "faunaflora";
          },
          fauna: (el) => {
             let categoria = el.categoryValue.join('');
            return categoria === "fauna" || categoria === "faunapaisajes" || categoria === "faunaflora" || categoria === "paisajesfauna" || categoria === "florafauna";
          }
        }
      }
    }
  },
  methods:{
    filter: function(key) {
    	this.$refs.cpt.filter(key);
    },
    layout(){
      this.$refs.cpt.layout('masonry');
    },
    editItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    }
  },
}
</script>
<style lang="scss" scoped>
.gallery{
  padding: 0 !important;
  //  @media screen and (max-width:1024px) {
  //    margin:0 !important;
  //  }
}
.menu-isotope{
  & ul {
    display:flex;
    justify-content:center;
    & li {
      text-decoration:none;
      list-style: none;
      margin: 1.5rem .6rem;
      cursor:pointer;
      font-size: 1.3rem;
    }
  }
}
.menu-isotope__li:active,
.menu-isotope__li.is-checked {
  color: #81C784;
  font-weight: 700;
}
.is-checked {
  color: #81C784;
  font-weight: 700;
  text-shadow: 13px 1px 15px #9CCC65;
}
.card{
  background: #81C784;
}
// .img-figure img{
//   @media screen and (max-width:1264px) {
//     display: block;
//     max-width:366.328px;
//     max-height:206.047px;
//     width: 366.328px;
//     height: 366.328px;
//   }
// }
.card-body{
  display:flex;
  padding:0 !important;
  background: #81C784;
  // top:0;
  & p {
    background: #81C784;
    color:#fff;
    margin-bottom:0;
    top: -2.5px;
  }
  & a{
    text-align:center;
    color:#81C784;
    background:#fff;
    top: -2.5px;
    padding: 5px 0;
    &:hover{
      background:#81C784;
      opacity:.7;
      color:#fff;
    }
  }
}
.dialog {
  &-description{
    margin-bottom: 2.5rem;
  }
  &-list{

    & li{
      list-style: none;
    }
  }
  &-detalles{
    &__left{
      max-width: 40%;
    // background: red;
       @media screen and (max-width:960px) {
          max-width: 55%;
       }
      & p {
        color:#81C784;
      }
      & span{
        float: right;
      }
    }
    &__right{
      padding-left: 10px;
    }
  }
  &-description{
    &__link{
      text-decoration: none;
      color:#9CCC65;
    }
  }

  &-figure img{
    max-width: 100%;
  }
}

</style>

<style lang="scss" scoped>
html {
  box-sizing: border-box;
  -ms-overflow-style: scrollbar;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>
