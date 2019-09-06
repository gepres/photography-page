<template>
  <div>
    <SliderText link="Contacto"/>
    <v-container>
        <v-layout>
          <v-flex>
            <h3 class="display-1">Contacto</h3>
            <p class="grey--text darken-1 mt-3 ml-3">Información de contacto para que te puedas comunicar si tienes una duda.</p>
          </v-flex>
      </v-layout>
    </v-container>
    <v-container class="light-green lighten-5">
      <!-- STAR -- Información de contacto -->
      <v-layout justify-space-around wrap>
        <v-flex xs12 class="mb-4"><h2 class="headline">Información de contacto</h2></v-flex>
        <v-flex lg2 class="grey lighten-5 pa-3 content-contact">
          <p class="grey--text darken-1">Dirección: <br><span class="black--text">Atenas #211</span></p>
          <span class="black--text">Ica - Perú</span>
        </v-flex>
        <v-flex lg2 class="grey lighten-5 pa-3 content-contact">
          <p class="grey--text darken-1">Telefono: <br> <span class="black--text">+941 947 154</span></p>
        </v-flex>
        <v-flex lg3 class="grey lighten-5 pa-3 content-contact">
           <p class="grey--text darken-1">Correo: <br> <span class="black--text">matthewsrn38@gmail.com</span></p>
        </v-flex>
        <v-flex lg3 class="grey lighten-5 pa-3 content-contact">
          <p class="grey--text darken-1">Pagina: <br> <span class="black--text">www.wildlife-culture.com</span></p>
        </v-flex>
      </v-layout>
      <!-- END -- Información de contacto -->
      <!-- STAR - Mapa y formulario  -->
      <v-layout wrap my-5>
        <v-flex lg6 md6 sm12 xs12 d-flex justify-center>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1935.2993690215437!2d-75.70497034206765!3d-14.041783395476116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDAyJzMwLjQiUyA3NcKwNDInMTQuMCJX!5e0!3m2!1ses-419!2spe!4v1566756125546!5m2!1ses-419!2spe" width="auto" height="300" frameborder="0" style="border:0;" allowfullscreen></iframe>
          
        </v-flex>        
        <v-flex lg6 md6 sm12 xs12 d-flex justify-center class="text-xs-center">
          <v-flex lg10 md10 sm10 xs10 class="grey lighten-5 form-contact">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            action="https://us-central1-fotografia-page-gepres.cloudfunctions.net/enviarEmail"
            method="post"
            @submit="enviar"
          >

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              name="remite"
              required
            ></v-text-field>

            <v-text-field
              v-model="asunto"
              :rules="asuntoRules"
              counter="15"
              label="Asunto"
              name="asunto"
              required
            ></v-text-field>

            <v-textarea
              name="cuerpo"
              label="Mensaje"
              hint="Mensaje"
              v-model="mensaje"
              :rules="mensajeRules"
              counter="150"
              required
            ></v-textarea>

            <v-btn
              round
              :disabled="!valid"
              color="success"
              type="submit"
            >
              Enviar
            </v-btn>
            <v-alert
              :value="true"
              v-show="showContact"
              type="success"
            >
              Mensaje enviado satisfactoriamente.
            </v-alert>
          </v-form>
          </v-flex>
        </v-flex>
      </v-layout>
      <!-- END - Mapa y formulario  -->
    </v-container>
  </div>
</template>
<script>
import SliderText from '@/components/Slider-text.vue'
export default {
  name:'contact',
  components:{
    SliderText
  },
  data(){
    return{
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+/.test(v) || 'El email debe ser válido'
      ],
      asunto:'',
      asuntoRules: [
        v => !!v || 'Asunto es requerido',
        v => (v && v.length <= 15) || 'El asunto debe tener menos de 15 caracteres.'
      ],
      mensaje:'',
      mensajeRules: [
        v => !!v || 'Mensaje es requerido',
        v => (v && v.length <= 150) || 'El mensaje debe tener menos de 15 caracteres.'
      ],
      showContact:false
    }
  },
  methods:{
    enviar(e){
      setTimeout(() => {
        e.preventDefault();
        this.showContact = true
      }, 2000);
      setTimeout(() => {
        e.preventDefault();
        window.location.reload()
      }, 4000);
    }
  }
}
</script>
<style lang="scss" scoped>
.content-contact{
  border-radius: 1rem;
   @media screen and (max-width:960px) {
      border-radius: 0;
  }
  & p{
    font-size: 1.1rem;
  }
}
.form-contact{
  border-radius:1rem;
  padding: 1rem 3rem 1rem 3rem;
  @media screen and (max-width:960px) {
    margin-top: 2.5rem;
    padding: .5rem 1.5rem .5rem 1.5rem;
  }
}
</style>
