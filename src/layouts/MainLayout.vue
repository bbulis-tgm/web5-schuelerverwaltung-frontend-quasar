<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Schülerverwaltung
        </q-toolbar-title>
        <q-toggle v-model="$root.successNotifications" label="Benachrichtigungen anzeigen" checked-icon="notifications_active"
          unchecked-icon="notifications_off" size="lg" color="secondary"></q-toggle>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <student-list :students="this.$root.studentsSorted"/>
    </q-page-container>

    <q-footer elevated class="bg-white">
      <student-input-form/>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
