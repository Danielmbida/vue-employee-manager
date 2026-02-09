<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const { employee } = defineProps({
  employee: {
    type: Object,
    required: true,
  },
})

const formattedDate = computed(() => {
  if (!employee.startDate) return '—'
  return new Intl.DateTimeFormat('fr-FR').format(new Date(employee.startDate))
})

const router = useRouter()

const goToDetail = (id) => {
  router.push(`/employee/${id}`)
}

defineEmits(['edit', 'delete'])
</script>

<template>
  <tr @click="goToDetail(employee.id)" class="employee-row">
    <td class="employee-info-cell">
      <div class="employee-info">
        <div class="avatar-wrapper">
          <img :src="employee.photo" class="employee-avatar" width="44" height="44" />
          <div class="avatar-ring"></div>
        </div>

        <div class="employee-details">
          <div class="employee-name">{{ employee.firstName }} {{ employee.lastName }}</div>
          <div class="employee-email">{{ employee.email }}</div>
        </div>
      </div>
    </td>
    <td class="department-cell">
      <span class="department-badge">
        {{ employee.department }}
      </span>
    </td>
    <td class="role-cell">
      <span class="role-text">{{ employee.role }}</span>
    </td>
    <td class="date-cell">
      <span class="date-text">{{ formattedDate }}</span>
    </td>
    <td class="actions-cell">
      <div class="action-buttons">
        <button class="action-btn edit-btn" @click.stop="$emit('edit', employee)" title="Modifier">
          <i class="bi bi-pencil"></i>
        </button>
        <button
          class="action-btn delete-btn"
          @click.stop="$emit('delete', employee.id)"
          title="Supprimer"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </td>
  </tr>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

.employee-row {
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid #f1f3f5;
  font-family:
    'DM Sans',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

.employee-row:hover {
  background: linear-gradient(to right, #fff8f3 0%, #fffbf7 100%);
  box-shadow: 0 2px 8px rgba(255, 106, 0, 0.08);
  transform: translateX(2px);
}

.employee-row:hover .avatar-ring {
  opacity: 1;
  transform: scale(1);
}

.employee-row:hover .employee-name {
  color: #ff6a00;
}

.employee-row:hover .action-btn {
  opacity: 1;
  transform: translateY(0);
}

.employee-info-cell {
  padding: 1.125rem 1rem;
}

.employee-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.employee-avatar {
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  border: 2.5px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.employee-row:hover .employee-avatar {
  border-color: #ff6a00;
  box-shadow: 0 4px 12px rgba(255, 106, 0, 0.2);
}

.avatar-ring {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6a00, #ff8534);
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s ease;
  z-index: 0;
}

.employee-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.employee-name {
  font-weight: 600;
  font-size: 0.938rem;
  color: #1a1d1f;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
  line-height: 1.3;
}

.employee-email {
  font-size: 0.813rem;
  color: #6f767e;
  font-weight: 500;
  letter-spacing: -0.005em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.department-cell,
.role-cell,
.date-cell {
  padding: 1.125rem 1rem;
  vertical-align: middle;
}

.department-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #fff4ed 0%, #ffe8d9 100%);
  color: #ff6a00;
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.813rem;
  letter-spacing: 0.01em;
  border: 1px solid rgba(255, 106, 0, 0.15);
  box-shadow: 0 2px 4px rgba(255, 106, 0, 0.08);
  transition: all 0.2s ease;
}

.employee-row:hover .department-badge {
  background: linear-gradient(135deg, #ff6a00 0%, #ff8534 100%);
  color: white;
  border-color: #ff6a00;
  box-shadow: 0 4px 8px rgba(255, 106, 0, 0.2);
  transform: translateY(-1px);
}

.role-text,
.date-text {
  font-size: 0.875rem;
  color: #272b30;
  font-weight: 500;
  letter-spacing: -0.005em;
}

.date-text {
  color: #6f767e;
}

.actions-cell {
  padding: 1.125rem 1rem;
  text-align: center;
  vertical-align: middle;
}

.action-buttons {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.938rem;
  opacity: 0.6;
  transform: translateY(3px);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:hover {
  opacity: 1 !important;
  transform: translateY(0) scale(1.08) !important;
}

.edit-btn {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #d97706;
  box-shadow: 0 2px 6px rgba(217, 119, 6, 0.15);
}

.edit-btn:hover {
  background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
  box-shadow: 0 4px 10px rgba(217, 119, 6, 0.25);
}

.delete-btn {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #dc2626;
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.15);
}

.delete-btn:hover {
  background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
  box-shadow: 0 4px 10px rgba(220, 38, 38, 0.25);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.employee-row {
  animation: fadeInUp 0.4s ease-out backwards;
}
</style>
