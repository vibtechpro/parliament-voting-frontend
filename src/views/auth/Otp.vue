<template>
  <v-card width="400" class="mx-auto mt-20">
    <v-card-title class="justify-center">
      <h4 class="">Enter OTP Code</h4>
    </v-card-title>
    <div v-if="responseText" class="ml-4 text-center">
      <span v-if="responseText.success" class="success--text">{{
        responseText.success
      }}</span>
      <span v-else class="error--text">{{ responseText.error }}</span>
    </div>

    <v-form @submit.prevent="verifyOTP">
      <v-card-text>
        <v-text-field
          v-model="code"
          name="code"
          label="Enter otp code here"
          type="tel"
          outlined
          rounded
          dense
          prepend-inner-icon="mdi-cellphone-android"
        />
      </v-card-text>

      <v-divider></v-divider>
      <br/>
      <v-card-actions>
        <v-btn rounded block class="green darken-4 pl-8 pr-8 white--text" :disabled="isSubmitted" type="submit">Submit</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn rounded block class="red darken-4 pl-8 pr-8 white--text" @click="sendOTP" :disabled="isResendSubmitted" type="button">Resend Otp</v-btn>
      </v-card-actions>
      <br/>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Otp",
  title: "Otp verify",
  data: () => ({
    code: null,
    isSubmitted: false,
    isResendSubmitted: false
  }),
  methods: {
    async verifyOTP() {
      this.isSubmitted = true;
      try {
        let results = await this.$store.dispatch("auth/verifyOTP", {phone: this.user.phone, code: this.code});
        if(results.data.success){
          this.$router.push({ name: 'BallotSheet' });
        }
        this.isSubmitted = false;
      } catch (error) {
        this.isSubmitted = false;
      }
    },
    sendOTP() {
      this.isResendSubmitted = true;
      this.$store.dispatch("auth/sendOTP", {phone: this.user.phone});
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/getAuthUser",
      responseText: "auth/getTesponseText"
    })
  }
};
</script>

<style scoped>
.mt-20 {
  margin-top: 150px;
}
</style>