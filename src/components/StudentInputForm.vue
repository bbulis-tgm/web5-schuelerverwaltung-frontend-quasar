<template>
    <q-form @submit.prevent="addStudent" class="row">
      <q-input id="add-student-firstname" class="col-md-3 col-sm-6 col-xs-12 q-pa-sm" style="box-sizing: border-box;" v-model.trim="firstname" label="Vorname"></q-input>
      <q-input id="add-student-lastname" class="col-md-3 col-sm-6 col-xs-12 q-pa-sm" style="box-sizing: border-box;" v-model.trim="lastname" label="Nachname"></q-input>
      <q-input id="add-student-class" class="col-md-2 col-sm-6 col-xs-12 q-pa-sm" style="box-sizing: border-box;" v-model.trim="schoolclass" label="Klasse"></q-input>
      <q-select id="add-student-subject" class="col-md-2 col-sm-6 col-xs-12 q-pa-sm" style="box-sizing: border-box;" :options="subjects" v-model="subject" label="Schwerpunkt"></q-select>

      <input type="submit" id="add-student-submit" class="inline col-md-1 col-sm-12 col-xs-12" style="box-sizing: border-box;" value="Speichern">
    </q-form>
</template>

<script>
export default {
  name: 'student-input-form',

  data () {
    return {
      firstname: '',
      lastname: '',
      schoolclass: '',
      subject: '',

      subjects: ['MEDT', 'SYT', 'NWTK']
    }
  },

  methods: {
    /**
     * Add a new student to the database. The properties of the new student are read from the input form.
     * All fields of the input form must be filled out. If that is not the case, an error message will be displayed,
     * prompting the user to fill out the empty fields.
     * If the student was added successfully, the form will be reset
     */
    addStudent: async function () {
      // Check for empty input fields
      if (!(this.firstname === '') && !(this.lastname === '') && !(this.schoolclass === '')) {
        // Call addStudent function of root component
        if (await this.$root.addStudent(this.firstname, this.lastname, this.schoolclass, this.subject)) {
          // Reset the form
          this.firstname = ''
          this.lastname = ''
          this.schoolclass = ''
          this.subject = ''
        }
      } else {
        // Show error notification
        this.$q.notify({
          type: 'warning',
          message: 'Bitte alle Eingabefelder ausfüllen',
          icon: 'notification_important',
          group: 'FORM_FIELDS_UNFILLED',
          position: 'top',
          timeout: 3000
        })
      }
    }
  }
}
</script>
