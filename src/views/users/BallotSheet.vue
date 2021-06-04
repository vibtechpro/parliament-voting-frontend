<template>
  <div>
    <Header />
    
    <ballot :poll="poll" />
  </div>

</template>

<script>
import Header from "@/components/Header";
import Ballot from '@/components/Ballot';
import { mapGetters } from "vuex";
export default {
  name: "BallotSheet",
  title: `Ballot sheet - voting`,
  components: {
    Header,
    Ballot
  },
  data: () => ({
    
  }),
  methods: {
    sendOTP() {
      this.$store.dispatch("auth/sendOTP", {phone: this.user.phone}).then(() => {
        this.$router.push({ name: 'Otp' });
      });
    },
    getPoll(){
      this.$store.dispatch('poll/getPoll');
    }, 
  },
  computed: {
    ...mapGetters({
      user: "auth/getAuthUser",
      poll: "poll/getPoll"
    })
  },
  async mounted() {
    await this.getPoll();
  }
};
</script>

<style scoped>
.routerLink{
     text-decoration: none;
 }
.card-border {
    border: solid #ffffff;
}
</style>