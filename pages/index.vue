<template>
  <div class="p-4">
    <component :is="user ? 'HomeAuth' : 'HomeNonAuth'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HomeAuth from '~/components/HomeAuth.vue'
import HomeNonAuth from '~/components/HomeNonAuth.vue'

export default {
  components: {
    HomeAuth,
    HomeNonAuth,
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>