<template>
  <q-item class="q-my-sm">
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white">
        {{ student.firstname.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label size="2em"><b>{{ student.lastname }}</b>, {{ student.firstname }}</q-item-label>
      <q-item-label caption size="1.5em" lines="1">{{ `${student.schoolclass} (${student.subject})` }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-rating v-model="student.rating" icon="star_border" icon-selected="star" size="2em" color="primary" @input="rate"></q-rating>
    </q-item-section>

    <q-item-section side>
      <q-btn round color="red-6" icon="delete" size="sm" @click="remove"/>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'student-item',

  data () {
    return {}
  },

  props: {
    student: {
      id: {
        type: Number
      },
      firstname: {
        type: String,
        default: ''
      },
      lastname: {
        type: String,
        default: ''
      },
      schoolclass: {
        type: String,
        default: ''
      },
      subject: {
        type: String,
        default: 'MEDT'
      },
      rating: {
        type: Number,
        default: 0
      }
    }
  },

  methods: {
    /**
     * Rate the student with a rating in the range [0, 5]
     *
     * @param {Number} rating - The rating for the student
     */
    rate: function (rating) {
      this.$root.rateStudent(this.student.id, rating)
    },

    /**
     * Remove the student from the database
     */
    remove: function () {
      this.$root.removeStudent(this.student.id)
    }
  }
}
</script>
