<template>
  <div>
    <Header />
    
    <v-row class="mt-10 pl-6 pr-6">
      <v-col cols="2">
        <router-link event @click.native.prevent="" to="#" class="routerLink">
          <DashboardCard name="Vote" :image-url="icons.vote" />
        </router-link>
      </v-col>
      <v-col cols="2">
        <DashboardCard name="View Results" :image-url="icons.viewResults" />
      </v-col>
      <v-col cols="2">
        <DashboardCard name="Attendance" :image-url="icons.attendance" />
      </v-col>
      <v-col cols="2">
        <DashboardCard name="History" :image-url="icons.history" />
      </v-col>
      <v-col cols="2">
        <DashboardCard name="Log" :image-url="icons.log" />
      </v-col>
      <v-col cols="2">
        <DashboardCard name="Get Help" :image-url="icons.help" />
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Header from "@/components/Header";
import DashboardCard from '@/components/DashboardCard';
export default {
  name: "Dashboard",
  title: "Dashboard",
  components: {
    Header,
    DashboardCard
  },
  data: () => ({
    icons: {
      vote: require('@/assets/vote.png'),
      history: require('@/assets/history.png'),
      viewResults: require('@/assets/view_results.png'),
      attendance: require('@/assets/attendance.png'),
      log: require('@/assets/log.png'),
      help: require('@/assets/help.png')
    }
  })
};
</script>

<style scoped>
.routerLink{
     text-decoration: none;
 }
</style>