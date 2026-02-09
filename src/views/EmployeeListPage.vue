<script setup>
import { computed, ref } from 'vue'
import EmployeeCard from '@/components/EmployeeCard.vue'

import { getEmployees, saveEmployees } from '@/data/employees'

const employees = ref(getEmployees())
const selectedEmployee = ref(null)

const employeesByDepartment = computed(() => {
  return employees.value.reduce((acc, employee) => {
    acc[employee.department] = (acc[employee.department] || 0) + 1
    return acc
  }, {})
})

const totalEmployees = computed(() => employees.value.length)

const openModal = (emp) => {
  selectedEmployee.value = { ...emp }
  isCreating.value = false
}

const saveEmployee = () => {
  if (isCreating.value) {
    selectedEmployee.value.id = Date.now()
    employees.value.push(selectedEmployee.value)
  } else {
    const index = employees.value.findIndex((e) => e.id === selectedEmployee.value.id)

    employees.value[index] = selectedEmployee.value
  }

  saveEmployees(employees.value)
  selectedEmployee.value = null
}

const deleteEmployee = (id) => {
  if (!confirm('Supprimer cet employé ?')) return

  employees.value = employees.value.filter((e) => e.id !== id)

  saveEmployees(employees.value)
}

const newEmployeeTemplate = {
  firstName: '',
  lastName: '',
  role: '',
  department: '',
  email: '',
  phone: '',
  startDate: '',
  status: 'Active',
}
const isCreating = ref(false)
const openCreateModal = () => {
  selectedEmployee.value = { ...newEmployeeTemplate }
  isCreating.value = true
}
const departments = ['IT', 'Human Resources', 'Design', 'Management', 'Finance']
</script>

<template>
  <div class="body">
    <div class="container py-4">
      <div class="mb-4">
        <h1 class="display-5 fw-bold text-dark mb-1">Gestion des employés</h1>
        <p class="text-muted mb-0">Administrez votre équipe en toute simplicité</p>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-body">
              <small class="text-muted text-uppercase">Total employés</small>
              <h2 class="text-warning fw-bold mb-0">{{ totalEmployees }}</h2>
            </div>
          </div>
        </div>

        <div
          v-for="(count, department) in employeesByDepartment"
          :key="department"
          class="col-md-3"
        >
          <div class="card shadow-sm border-0 h-100">
            <div class="card-body">
              <small class="text-muted text-uppercase">{{ department }}</small>
              <h2 class="text-primary fw-bold mb-0">{{ count }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-warning" @click="openCreateModal">
          <i class="bi bi-person-plus me-1"></i>
          Ajouter un employé
        </button>
      </div>

      <div class="card shadow-sm border-0">
        <div class="card-body p-0">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Employé</th>
                <th>Département</th>
                <th>Poste</th>
                <th>Date d'embauche</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <EmployeeCard
                v-for="employee in employees"
                :key="employee.id"
                :employee="employee"
                @edit="openModal"
                @delete="deleteEmployee"
              />
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal fade show d-block custom-modal-backdrop" v-if="selectedEmployee">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg">
            <div class="modal-header border-0">
              <h5 class="modal-title">
                {{ isCreating ? 'Ajouter un employé' : 'Modifier un employé' }}
              </h5>
              <button type="button" class="btn-close" @click="selectedEmployee = null"></button>
            </div>

            <form @submit.prevent="saveEmployee">
              <div class="modal-body pt-0">
                <div class="row g-2">
                  <div class="col-md-6">
                    <input
                      v-model="selectedEmployee.firstName"
                      class="form-control"
                      placeholder="Prénom"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      v-model="selectedEmployee.lastName"
                      class="form-control"
                      placeholder="Nom"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      v-model="selectedEmployee.role"
                      class="form-control"
                      placeholder="Poste"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <select v-model="selectedEmployee.department" class="form-select" required>
                      <option disabled value="">Département</option>
                      <option v-for="dept in departments" :key="dept" :value="dept">
                        {{ dept }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <input
                      v-model="selectedEmployee.email"
                      class="form-control"
                      placeholder="Email"
                      type="email"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      v-model="selectedEmployee.phone"
                      class="form-control"
                      placeholder="Téléphone"
                      type="tel"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      type="date"
                      v-model="selectedEmployee.startDate"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="modal-footer border-0">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="selectedEmployee = null"
                >
                  Annuler
                </button>
                <button type="submit" class="btn btn-warning">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
