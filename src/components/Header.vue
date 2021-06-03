<template>
    <v-sheet
      :color="headerColor"
      height="180"
      width="auto"
      v-if="$route.meta.showMenubar"
      class="pt-6 pl-16"
    >
    <v-row class="mt-10">
      <v-col cols="1">
        <v-avatar
          color="primary"
          rounded
          size="80"
          class="rounded-lg"
        >
          <v-img :src="user.image_url"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="2" class="white--text">
        <div class="mt-4">
          <h4>{{ user.name }}</h4>
          <h5>MP for {{ user.constituency }} Constituency</h5>
        </div>
      </v-col>
    </v-row>

      <!-- <v-btn color="primary justify-right">
        <v-icon left>
          mdi-logout
        </v-icon>
        Logout
      </v-btn> -->
    </v-sheet>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data: () => ({
  }),
  computed:{
    headerColor() {
      return this.$route.meta.menuBackgroundColor;
    },
    ...mapGetters({
      user: "auth/getAuthUser"
    })
  }
};
</script>
