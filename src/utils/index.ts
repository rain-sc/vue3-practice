export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}

export function transListToTreeData(list: any, parentId: string | number): any {
  return list
    .filter(item => item.pid === parentId)
    .map(item => ({
      ...item,
      children: transListToTreeData(list, item.id!),
    }))
}
