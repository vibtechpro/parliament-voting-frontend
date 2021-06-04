<template>
    <v-row class="pa-5">
        <v-col cols="2">
        <v-avatar
            color="primary"
            rounded
            size="100"
            class="rounded-lg"
        >
            <v-img :src="candidate.image"></v-img>
        </v-avatar>
        </v-col>
        <v-col cols="6" class="pt-12">
        <h3>{{ candidate.name }}</h3>
        </v-col>
        <v-col cols="4" class="pt-12">
        <v-btn
            elevation="2"
            color="green darken-4"
            class="white--text pl-5 pr-5 float-end"
            rounded
        >
        Vote
        </v-btn>
        </v-col>
    </v-row>
    
</template>

<script>
export default {
  name: "BallotCandidate",
  props: {
      candidate: {
          type: Object
      }
  },
  data: () => ({
      
  }),
  methods: {
      
  }
};
</script>

<style scoped>
</style>