<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

import { getEmployees } from '@/data/employees'

const employees = ref(getEmployees())

const route = useRoute()

const employee = computed(() => employees.value.find((e) => e.id === Number(route.params.id)))
console.log(employee.value)
</script>

<template>
  <div class="container py-4" v-if="employee">
    <div class="card border-0 shadow-sm p-4 mb-4">
      <div class="d-flex align-items-center gap-4">
        <img :src="employee.photo" class="rounded-circle" width="200" height="200" />

        <div>
          <h3 class="mb-1">{{ employee.firstName }} {{ employee.lastName }}</h3>
          <p class="text-muted mb-2">{{ employee.role }}</p>

          <span class="badge bg-orange me-2">{{ employee.department }}</span>
          <span class="badge bg-light text-orange">{{ employee.status }}</span>
        </div>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card p-3 border-0 shadow-sm">
          <strong>Email</strong>
          <span>{{ employee.email }}</span>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3 border-0 shadow-sm">
          <strong>Téléphone</strong>
          <span>{{ employee.phone }}</span>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3 border-0 shadow-sm">
          <strong>Date d'embauche</strong>
          <span>{{ employee.startDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-orange {
  background: #ff6a00;
}

.text-orange {
  color: #ff6a00;
}
</style>
