import { createRouter, createWebHistory } from 'vue-router'
import EmployeeListPage from '@/views/EmployeeListPage.vue'
import EmployeeDetailPage from '@/views/EmployeeDetailPage.vue'
import CreateEmployeePage from '@/views/CreateEmployeePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'employee/list', component: EmployeeListPage },
    { path: '/employee/:id', name: 'employeeDetail', component: EmployeeDetailPage, props: true },
    { path: '/employee/create', name: 'createEmployee', component: CreateEmployeePage },
  ],
})
export default router
