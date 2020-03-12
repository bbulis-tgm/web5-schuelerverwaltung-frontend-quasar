<template>
  <q-list bordered>
    <student-item v-for="(student, index) in students" :student="student" :index="index" :key="student.lastname"></student-item>
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
