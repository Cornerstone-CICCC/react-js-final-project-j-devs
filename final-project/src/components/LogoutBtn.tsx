import { logoutCustomer } from "@/app/actions/customer.actions"

const LogoutBtn = () => {
  return (
    <form action={logoutCustomer}>
      <button>Logout</button>
    </form>
  )
}

export default LogoutBtn