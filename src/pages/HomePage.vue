<template>
  <div>
    <AboutComponent />
    <TechStackComponent />
    <HobbiesComponent />
    <OverMijComponent />
  </div>
</template>
<script>
import AboutComponent from "@/components/About.vue";
import TechStackComponent from "@/components/TechStack.vue";
import HobbiesComponent from "@/components/Hobbies.vue";
import OverMijComponent from "@/components/OverMij.vue";
export default {
  name: "HomePage",
  components: { AboutComponent, TechStackComponent, HobbiesComponent, OverMijComponent }
}
</script>
