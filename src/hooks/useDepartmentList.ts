import { getDepartmentListAPI } from '@/api/department'
import type { DepartmentListType } from '@/api/department/types'
import { transListToTreeData } from '@/utils'

function useDepartmentList() {
  const departmentList = ref<DepartmentListType[]>([])
  const departmentListLoading = ref<boolean>(false)
  const departmentId = ref<string | undefined>(undefined)

  async function getDepartmentList() {
    departmentListLoading.value = true

    try {
      const res = await getDepartmentListAPI()
      const resData = res.data.data!
      departmentList.value = transListToTreeData(resData, 0)
      departmentId.value = departmentList.value[0].id
    }
    catch (error) {
      console.error(error)
    }
    finally {
      departmentListLoading.value = false
    }
  }

  return {
    getDepartmentList,
    departmentList,
    departmentListLoading,
    departmentId,
  }
}

export default useDepartmentList
