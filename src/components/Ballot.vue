<template>
  <div>    
    <div v-for="port in poll.portfolio" :key="port.id">
        <div class="pa-6 text-center grey lighten-2">
            <h4 class="text-uppercase">{{ poll.type }}</h4>
            <h1 class="text-uppercase">{{ port.name }}</h1>
        </div>
        <v-card width="800" class="mx-auto mt-4" elevation="0">
            <ballot-candidate :candidate="candidate" v-for="candidate in port.candidates" :key="candidate.id" />
        </v-card>
    </div>
  </div>

</template>

<script>
import BallotCandidate from '@/components/BallotCandidate';
export default {
  name: "Ballot",
  props: {
      poll: {
          type: Object,
          required: true
      }
  },
  components: {
    BallotCandidate
  },
  data: () => ({
    
  }),
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