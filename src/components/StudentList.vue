<template>
  <q-list bordered>
    <student-item v-for="student in students" :student="student" :key="student.lastname"></student-item>
  </q-list>
</template>

<script>
export default {
  name: 'student-list',

  data () {
    return {}
  },

  props: {
    students: {
      type: Array,
      default: () => []
    }
  }
}
</script>
