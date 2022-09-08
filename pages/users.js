import { useSelector } from "react-redux"
import AppLayout from "../components/layouts/AppLayout"
import { getUser } from "../store/slices/authSlice"

export default function dashboard() {
    const user = useSelector(getUser)

    return (
        <AppLayout>
            <h1>Users</h1>
            <p>{user?.name}</p>
        </AppLayout>
    )
}