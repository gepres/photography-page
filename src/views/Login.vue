<template>
  <div>
    <SliderText link="Login"/>
    <v-container>
      <v-layout wrap>
      <v-flex lg4 md10 >
      <div class="container-admin">
      <v-container class="content">
        <v-layout>
          <v-responsive height="80px" class="mt-3" dark> 
            <v-container class="green accent-4 white--text">
              <v-layout>
                <v-flex text-xs-center>
                  <h3 class="title">Ingresar</h3>
                </v-flex>
              </v-layout>
            </v-container>
          </v-responsive>
        </v-layout>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Correo"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Contraseña"
              required
              @keyup.enter="ingresar"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              @click="ingresar"
            >
              Ingresar
            </v-btn>
          </v-form>
      </v-container>
    </div>
    </v-flex>
      </v-layout>
    </v-container>
    
  </div>
</template>
<script>
import firebase from 'firebase'
import SliderText from '@/components/Slider-text.vue'
export default {
  name:'login',
  data () {
    return {
      valid:false,
      email:'',
      emailRules:[
        (v) => !!v || 'E-mail es requerido',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail es requerido'
      ],
      password:'',
      passwordRules:[
        (v) => !!v ||  'Contraseña es requerido',
        (v) => v.length >= 6 || 'Tiene que escribir más de 6 caracteres'
      ]
    }
  },
  components:{
    SliderText
  },
  methods:{
    ingresar () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          console.log('ingresado por firebase')
          this.$router.replace({ name: 'admin' })
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('no a ingresado');
          // ...
        });
    }
  }
}
</script>
<style lang="scss" scoped>
.container-admin{
  margin: 4rem 0;
}
.container{
  width: 50vw;
}
.content{
  padding: 0;
}
.v-form{
  text-align: center;
}
</style>

