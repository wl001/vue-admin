/**
 * Created by 王磊 on 2018/9/20.
 */
const getters = {
  val:(state)=>state.num.count%2?'奇数':'偶数',
  messNum:(state)=>state.num.messageLength,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
