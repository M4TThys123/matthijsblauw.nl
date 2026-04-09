<template>
  <a
      :href="pdfPath"
      class="pdf-link"
      target="_blank"
      :download="pdfFileName"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "PDFLink",
  props: {
    pdfFileName: {
      type: String,
      required: true
    }
  },
  computed: {
    pdfPath() {
      return `/pdf/${encodeURIComponent(this.pdfFileName)}`;
    }
  }
}
</script>

<style scoped>
.pdf-link {
  font-size: 35px;
  color: var(--color-text);
  padding: 0 16px;
}
</style>