<template>
  <v-card width="400" class="mx-auto mt-20">
    <v-card-title class="justify-center">
      <h4 class="">Log In</h4>
    </v-card-title>
    <!-- <div v-if="responseText" class="ml-4 text-center">
      <span v-if="responseText.success" class="success--text">{{
        responseText.success
      }}</span>
      <span v-else class="error--text">{{ responseText.error }}</span>
    </div> -->

    <v-form @submit.prevent="">
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
            >Forgotten password</router-link
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
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "Login",
  title: "Log in",
  data: () => ({
    showPassword: false,
    credentials: {
      phone: null,
      password: null
    },
    isSubmitted: false
  })
};
</script>

<style scoped>
.mt-20 {
  margin-top: 150px;
}
</style>