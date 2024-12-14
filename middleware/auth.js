export default function ({ store, redirect, route }) {
  const protectedRoutes = ['/tasks', '/rsvp', '/polls']

  if (!store.state.user && protectedRoutes.includes(route.path)) {
    return redirect('/signin')
  }
}