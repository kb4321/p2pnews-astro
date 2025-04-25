<template>
  <div>
    <!-- Trigger Button with Diamond Icon -->
    <button @click="isOpen = true" class="p-2 text-blue-600 hover:text-blue-800" aria-label="Join Premium Waitlist">
  <!-- Inline Tabler Diamond SVG -->
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M6 4h12l4 6-10 12L2 10l4-6z" />
  </svg>
</button>
    <!-- Modal -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="isOpen = false"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          class="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          @click="isOpen = false"
        >
          ×
        </button>
        <h2 class="text-lg font-semibold mb-2">🚀 Premium Features Coming Soon</h2>
        <p class="text-sm mb-4 text-gray-600">
          Join our premium waitlist now and receive <span class="text-blue-600 font-semibold">30% off</span> when we launch!
        </p>

        <form @submit.prevent="handleJoinWaitlist">
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
          <button
            type="submit"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Join the Waitlist
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

// Refs
const isOpen = ref(false)
const email = ref('')
const name = ref('')
const status = ref('')

// Supabase setup
const DATABASE_URL = "https://jisfqytmimlowxlmwebg.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc2ZxeXRtaW1sb3d4bG13ZWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1NjM4MjAsImV4cCI6MjAwMTEzOTgyMH0.mY3oqMAJDu9Fc9OrzIzhZQkILHxP9lc_lUnf-Q8Jh6s"
const supabase = createClient(DATABASE_URL, SUPABASE_KEY)

// Submit to premium_waiting_list
const handleJoinWaitlist = async () => {
  const { error } = await supabase
    .from('waiting_list')
    .insert([{ email: email.value, notes: name.value }])

  if (error) {
    status.value = `❌ Error: ${error.message}`
  } else {
    status.value = '✅ You’re on the list! Check your inbox for updates.'
    email.value = ''
    name.value = ''
  }
}
</script>
