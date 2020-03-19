import StudentItem from '../components/StudentItem'
import StudentList from '../components/StudentList'
import StudentInputForm from '../components/StudentInputForm'

export default ({ app, Vue }) => {
  Vue.component('student-item', StudentItem)
  Vue.component('student-list', StudentList)
  Vue.component('student-input-form', StudentInputForm)

  app.data = () => {
    return {
      apiBase: 'http://medt.school.bulis.xyz/api', // Change this to the base URL of the REST API

      students: []
    }
  }

  app.computed = {
    studentsSorted: function () {
      return this.students.sort((s1, s2) => {
        return (s1.lastname < s2.lastname) ? -1 : (s1.lastname > s2.lastname)
      })
    }
  }

  app.methods = {
    addStudent: async function (firstname, lastname, schoolclass, subject) {
      const s = {
        firstname: firstname,
        lastname: lastname,
        schoolclass: schoolclass,
        subject: subject,
        rating: 0 // Default rating is always 0
      }

      console.log(s)
      this.students.push(s)

      // Send the data to the server and add it to the view as soon as the request is returned
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const resp = await fetch(`${this.apiBase}/student`, {
        method: 'POST',
        body: JSON.stringify(s),
        headers: headers
      })

      if (resp.ok) {
        this.reload()
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Der Schüler konnte nicht hinzugefügt werden',
          icon: 'error',
          group: 'ADD_STUDENT_ERROR',
          position: 'top',
          timeout: 3000
        })
      }
    },

    rateStudent: async function (index, rating) {
      if (this.students.length > index) {
        // Update the rating
        this.students[index].rating = rating

        // Send the PUT request to the server
        const resp = await fetch(`${this.apiBase}/student/${index}`, {
          method: 'PUT',
          body: JSON.stringify(this.students[index])
        })

        if (resp.ok) {
          this.reload()
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Der Schüler konnte nicht bewertet werden',
            icon: 'error',
            group: 'GRADE_STUDENT_ERROR',
            position: 'top',
            timeout: 3000
          })
        }
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Der Schüler konnte nicht bewertet werden',
          icon: 'error',
          group: 'GRADE_STUDENT_ERROR',
          position: 'top',
          timeout: 3000
        })
      }
    },

    reload: async function () {
      const resp = await fetch(`${this.apiBase}/student`)

      if (resp.ok) {
        this.students = await resp.json()
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Die Schülerdaten konnten nicht abgerufen werden',
          icon: 'error',
          group: 'LOAD_STUDENTS_ERROR',
          position: 'top',
          timeout: 3000
        })
      }
    },

    removeStudent: async function (index) {
      if (this.students.length > index) {
        // Send the DELETE request to the server and remove the student from the view as soon as the response is received
        const resp = await fetch(`${this.apiBase}/student/${index}`, {
          method: 'DELETE'
        })

        if (resp.ok) {
          this.reload()
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Der Schüler konnte nicht entfernt werden',
            icon: 'error',
            group: 'REMOVE_STUDENT_ERROR',
            position: 'top',
            timeout: 3000
          })
        }
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Der Schüler konnte nicht entfernt werden',
          icon: 'error',
          group: 'REMOVE_STUDENT_ERROR',
          position: 'top',
          timeout: 3000
        })
      }
    }
  }

  app.mounted = function () {
    this.reload()
  }
}
