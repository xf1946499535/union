//侧边栏信息
type AsideListItem = {
  path: string,
  name: string,
  component?: void,
  meta: Asidemeta
}
//侧边栏元数据
type Asidemeta = {
  title: string,
  code: string,
  requireLogin: boolean
}