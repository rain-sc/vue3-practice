import { getDepartmentListAPI } from '@/api/department'
import type { DepartmentListType } from '@/api/department/types'

function useDepartmentList() {
  const departmentList = ref<DepartmentListType[]>([])
  const loading = ref<boolean>(false)
  const departmentId = ref<string | undefined>(undefined)

  function transListToTreeData(list: DepartmentListType[], parentId: string | number): DepartmentListType[] {
    return list
      .filter(item => item.pid === parentId)
      .map(item => ({
        ...item,
        children: transListToTreeData(list, item.id!),
      }))
  }

  async function getDepartmentList() {
    loading.value = true

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
      loading.value = false
    }
  }

  return {
    getDepartmentList,
    departmentList,
    loading,
    departmentId,
  }
}

export default useDepartmentList
