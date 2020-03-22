import StudentItem from '../components/StudentItem'
import StudentList from '../components/StudentList'
import StudentInputForm from '../components/StudentInputForm'

export default ({ app, Vue }) => {
  // Add the three custom components to the Vue app
  Vue.component('student-item', StudentItem)
  Vue.component('student-list', StudentList)
  Vue.component('student-input-form', StudentInputForm)

  app.data = () => {
    return {
      apiBase: 'http://medt.school.bulis.xyz/api', // Change this to the base URL of the REST API

      students: [] // The array that will hold the student objects
    }
  }

  app.computed = {
    studentsSorted: function () {
      // The student objects, sorted by their surname in ascending order
      return this.students.sort((s1, s2) => {
        return (s1.lastname < s2.lastname) ? -1 : (s1.lastname > s2.lastname)
      })
    }
  }

  app.methods = {
    /**
     * Add a new student to the database
     *
     * @param {string} firstname - The first name of the student
     * @param {string} lastname - The last name of the student
     * @param {string} schoolclass - The class of the student
     * @param {string} subject - The focus subject of the student
     *
     * @returns {Boolean} true if the student was added successfully, false otherwise
     */
    addStudent: async function (firstname, lastname, schoolclass, subject) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      try {
        // Send a HTTP POST request to the API
        const resp = await fetch(`${this.apiBase}/student`, {
          method: 'POST',
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            schoolclass: schoolclass,
            subject: subject,
            rating: 0 // Default rating is always 0
          }),
          headers: headers
        })

        if (resp.ok) {
          // Reload the students from the API so that the new student is also included
          this.reload()
          return true
        } else {
          // Display an error message
          this.$q.notify({
            type: 'negative',
            message: 'Der Schüler konnte nicht hinzugefügt werden',
            icon: 'error',
            group: 'ADD_STUDENT_ERROR',
            position: 'top',
            timeout: 3000
          })
          return false
        }
      } catch (error) {
        console.log(error)

        // A JavaScript error occured (e.g. no internet connection) - display an error message
        this.$q.notify({
          type: 'negative',
          message: 'Der Schüler konnte nicht hinzugefügt werden',
          icon: 'error',
          group: 'ADD_STUDENT_ERROR',
          position: 'top',
          timeout: 3000
        })

        return false
      }
    },

    /**
     * Rate a student with a score ranging from 1 to 5
     *
     * @param {Number} id - The ID of the student to rate
     * @param {Number} rating - The rating, an integer Number in the range [0, 5]
     *
     * @returns {Boolean} true if the student was rated successfully, false otherwise
     */
    rateStudent: async function (id, rating) {
      if (rating < 0 || rating > 5) {
        // The rating must be between 0 and 5 - display an error message
        this.$q.notify({
          type: 'negative',
          message: 'Die Bewertung muss zwischen 0 und 5 liegen',
          icon: 'error',
          group: 'ILLEGAL_RATING_ERROR',
          position: 'top',
          timeout: 3000
        })

        return false
      }

      // Find the student in the array and update the rating
      const s = this.students.find(elem => elem.id === id)
      s.rating = rating

      try {
        // Send a PUT request to the server including the new student
        const resp = await fetch(`${this.apiBase}/student/${id}`, {
          method: 'PUT',
          body: JSON.stringify(s, ['firstname', 'lastname', 'schoolclass', 'subject', 'rating']) // Only include those 5 properties in the PUT request
        })

        if (resp.ok) {
          // Reload the students from the API so that the student has the new rating
          this.reload()
          return true
        } else {
          // Display an error message
          this.$q.notify({
            type: 'negative',
            message: 'Der Schüler konnte nicht bewertet werden',
            icon: 'error',
            group: 'RATE_STUDENT_ERROR',
            position: 'top',
            timeout: 3000
          })
          return false
        }
      } catch (error) {
        console.log(error)

        // A JavaScript error occured (e.g. no internet connection) - display an error message
        this.$q.notify({
          type: 'negative',
          message: 'Der Schüler konnte nicht bewertet werden',
          icon: 'error',
          group: 'RATE_STUDENT_ERROR',
          position: 'top',
          timeout: 3000
        })

        return false
      }
    },

    /**
     * Reload the students from the API
     */
    reload: async function () {
      try {
        // GET request all students from the API
        const resp = await fetch(`${this.apiBase}/student`)

        if (resp.ok) {
          // Parse the returned JSON and set this.students to the returned data
          this.students = (await resp.json()).data
        } else {
          // Reset the students array and display an error message
          this.students = []

          this.$q.notify({
            type: 'negative',
            message: 'Die Schülerdaten konnten nicht abgerufen werden',
            icon: 'error',
            group: 'LOAD_STUDENTS_ERROR',
            position: 'top',
            timeout: 3000
          })
        }
      } catch (error) {
        console.log(error)

        // A JavaScript error occured (e.g. no internet connection) - display an error message
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

    /**
     * Remove a student from the database
     *
     * @param {Number} id - The ID of the student to be removed
     *
     * @returns {Boolean} true if the student was removed successfully, false otherwise
     */
    removeStudent: async function (id) {
      try {
        // Send the DELETE request to the server
        const resp = await fetch(`${this.apiBase}/student/${id}`, {
          method: 'DELETE'
        })

        if (resp.ok) {
          // Reload the student data so that the new student is removed
          this.reload()
          return true
        } else {
          // Display an error message
          this.$q.notify({
            type: 'negative',
            message: 'Der Schüler konnte nicht entfernt werden',
            icon: 'error',
            group: 'REMOVE_STUDENT_ERROR',
            position: 'top',
            timeout: 3000
          })
          return false
        }
      } catch (error) {
        console.log(error)

        // A JavaScript error occured (e.g. no internet connection) - display an error message
        this.$q.notify({
          type: 'negative',
          message: 'Der Schüler konnte nicht entfernt werden',
          icon: 'error',
          group: 'REMOVE_STUDENT_ERROR',
          position: 'top',
          timeout: 3000
        })

        return false
      }
    }
  }

  app.mounted = function () {
    // On startup, load the students from the API
    this.reload()
  }
}
