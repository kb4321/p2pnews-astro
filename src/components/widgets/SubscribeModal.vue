<template>
  <div>
    <button
  @click="isOpen = true"
class="ml-2 btn-secondary py-3.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto appearance-none leading-none rounded-full"
>
  Subscribe
</button>




    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="isOpen = false">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button class="absolute top-2 right-3 text-gray-500 hover:text-black text-xl" @click="isOpen = false">×</button>
        <h2 class="text-lg font-semibold mb-4">Subscribe to Our News Updates</h2>
        <form @submit.prevent="handleSubscribe">
          <input
            v-model="name"
            type="text"
            placeholder="Your name (optional)"
            class="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            v-model="email"
            type="email"
            required
            placeholder="Your email"
            class="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Subscribe
          </button>
          <p v-if="status" class="mt-2 text-sm text-gray-600">{{ status }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

const isOpen = ref(false)
const email = ref('')
const name = ref('')
const status = ref('')
const DATABASE_URL = "https://jisfqytmimlowxlmwebg.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc2ZxeXRtaW1sb3d4bG13ZWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1NjM4MjAsImV4cCI6MjAwMTEzOTgyMH0.mY3oqMAJDu9Fc9OrzIzhZQkILHxP9lc_lUnf-Q8Jh6s"
const supabase = createClient(
  DATABASE_URL,
  SUPABASE_KEY
)

const handleSubscribe = async () => {
  const { error } = await supabase.from('subscribers').insert([{ email: email.value, name: name.value }])

  if (error) {
    status.value = `Error: ${error.message}`
  } else {
    status.value = 'Thank you for subscribing!'
    email.value = ''
    name.value = ''
  }
}
</script>
