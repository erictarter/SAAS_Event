// middleware/auth.js
export default function ({ store, redirect, route }) {
  const protectedRoutes = ['/tasks', '/rsvp', '/polls', '/profile', '/plans']

  if (!store.state.user && protectedRoutes.includes(route.path)) {
    return redirect('/signin')
  }
}