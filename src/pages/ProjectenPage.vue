<template>
  <div class="container-class" style="margin-top: 100px;">
    <div class="row-class">
      <h1 class="section__title">Mijn <span class="text--blue">Projecten</span></h1>
    </div>
    <ProjectsComponent />
  </div>
</template>
<script>
import ProjectsComponent from "@/components/Projects.vue";
export default {
  name: "ProjectenPage",
  components: { ProjectsComponent }
}
</script>
