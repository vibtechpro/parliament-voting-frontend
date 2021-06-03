<template>
  <div>
      <div>
          <v-card width="400" class="mx-auto mt-20 rounded-lg">
            <v-card-title class="justify-center">
              <h4 class="">Log In</h4>
            </v-card-title>
            <div v-if="responseText" class="ml-4 text-center">
              <span v-if="responseText.success" class="success--text">{{
                responseText.success
              }}</span>
              <span v-else class="error--text">{{ responseText.error }}</span>
            </div>

            <v-form @submit.prevent="login">
              <v-card-text>
                <v-text-field
                  v-model="credentials.phone"
                  name="phone"
                  label="Enter phone number here"
                  type="tel"
                  outlined
                  rounded
                  dense
                  prepend-inner-icon="mdi-cellphone-android"
                />

                <v-text-field
                  v-model="credentials.password"
                  name="password"
                  label="Enter password here"
                  outlined
                  rounded
                  dense
                  :type="showPassword ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
              </v-card-text>

                
              <v-card-actions>
                <v-spacer></v-spacer>
                <span class="">
                  <router-link :to="{ name: 'Forgotten' }"
                    >Forgot password?</router-link
                  >
                </span>
              </v-card-actions>

              <v-divider></v-divider>
              <br/>
              <v-card-actions>
                <v-btn rounded block class="green darken-4 pl-8 pr-8 white--text" :disabled="isSubmitted" type="submit">Log In</v-btn>
              </v-card-actions>
              <br/>
            </v-form>
          </v-card>

      </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  title: "Log in",
  data: () => ({
    showPassword: false,
    credentials: {
      phone: null,
      password: null
    },
    isSubmitted: false,
    logo: require('@/assets/logo.png'),
  }),
  methods: {
    async login() {
      this.isSubmitted = true;
      this.$store.dispatch("auth/loginUser", this.credentials).then(() => {
        this.$router.push({ name: "Dashboard" });
      });
    }
  },
  computed: {
    ...mapGetters({
      responseText: "auth/getTesponseText"
    })
  }
};
</script>

<style scoped>
.mt-20 {
  margin-top: 150px;
}

.img-logo {
  border-radius: 50%;
  display: block;
  width: 150px;
  height: auto;
}



/* This is the circular image. */
.bio-photo {
  border-radius: 50%;
  display: block;
  width: 150px;
  height: auto;
}

.body-color {
  background-color: #333 !important;
}

/* This is the outer div. Top white box. */
.box {
  /* This needs to be inline-block display. */
  display: inline-block;
  
  /* Width and height of the box */
  width: 900px;
  height: 200px;
  
  /* Position of the box on the page. */
  margin: 10px;
  
  /* Background color of the top box */
  background-color: #fefefe;
}

/* This is for the span where the image or text is placed. */
.box span {
  /* This needs to be block display. */
  display: block;
  
  /* Size of the circle  */
  width: 150px;
  height: 150px;
  
    /* This changes the square into a circle */
  border-radius: 100%;
   
  /* Necessary for the placement of the circle  */
  margin-top: 125px;
  margin-left: 375px;
  
  /*  The border around the circle  */
  /*  border: 2px solid black; */
  
  /* This would create a nice white semi-circle under the photo.   */
  /* border: 20px solid white; */
  
    /* This would create a nice grayt semi-circle under the photo.   */
  
  /*  Relevant if using text.  */
}

/* This is the inner div. Bottom gray box. */
.box2 {
  /* This needs to be position relative.*/
  position: relative;  
  
  /* z-index needs to be set to a negative number, below the circular image.*/
  z-index: -10;
  
  display: inline-block;
  width: 900px;
  height: 100px;
  
  /* This number may need to be adjusted if any changes are made
  to border thickness. */
  margin-top: -119px;
  background-color: #ccc !important;
  vertical-align: top;
}
</style>