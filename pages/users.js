import { useSelector } from "react-redux"
import AppLayout from "../components/layouts/AppLayout"
import { useFetchNotificationsQuery } from "../store/reducers/authApi"
import { getUser } from "../store/slices/authSlice"

export default function Users() {
    const user = useSelector(getUser)
    const {data:notifications, isLoading, error} = useFetchNotificationsQuery()
    
    return (
        <AppLayout>
            <h1>Users</h1>
            <p>{user?.name}</p>
        </AppLayout>
    )
}