<template>
    <v-card class="rounded-xl card-border" elevation="2">
        <v-card-text>
            <v-img :src="imageUrl" :alt="name"></v-img>
            <div class="justify-center text-center">
                <h3 class="black--text">{{ name }}</h3>
            </div>
        </v-card-text>
    </v-card>
</template>


<script>
export default {
  name: "DashboardCard",
  props: {
    name: {
       type: String,
       required: true 
    },
    imageUrl: {
        type: String,
        required: true
    }
  },
  data: () => ({

  })
};
</script>

<style scoped>
.card-border {
    border: solid gray;
}

</style>
