<template>
  <v-layout column>
    <PageHeader><slot name="title"></slot></PageHeader>
    <PageContent><slot></slot></PageContent>
  </v-layout>
</template>

<script>
import PageHeader from "@/components/Base/PageHeader";
import PageContent from "@/components/Base/PageContent";

export default {
  name: "Page",
  components: { PageContent, PageHeader }
};
</script>
