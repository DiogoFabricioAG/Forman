<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLogin = ref(route.query['authenticated'] === 'true')

// Estados del formulario
const loginData = ref({
  email: '',
  password: '',
})

const signupData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Funciones
const toggleMode = () => {
  isLogin.value = !isLogin.value
}

const handleLogin = () => {
  console.log('Login:', loginData.value)
  // Aquí iría la lógica de login
}

const handleSignup = () => {
  console.log('Signup:', signupData.value)
  // Aquí iría la lógica de registro
}

const handleGoogleAuth = () => {
  console.log('Google Auth')
  // Aquí iría la lógica de Google OAuth
}
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white shadow-2xl flex overflow-hidden">
      <!-- Panel izquierdo - Imagen y branding -->
      <div class="hidden lg:flex lg:w-1/2 bg-yellow-400 relative">
        <div class="flex flex-col justify-center items-center p-12 text-center">
          <div class="mb-8">
            <img
              class="w-32 h-32 mx-auto mb-6"
              src="@/assets/icon-principal.png"
              alt="Forman Logo"
            />
            <h1 class="text-4xl font-bold text-black mb-4">Forman</h1>
            <p class="text-lg text-gray-800 leading-relaxed">
              La plataforma de IA más avanzada para crear formatos profesionales de manera
              inteligente y eficiente.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm text-gray-800">
            <div class="flex items-center gap-2">
              <i class="fas fa-robot text-black"></i>
              <span>IA Avanzada</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-file-alt text-black"></i>
              <span>Formatos Pro</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-shield-alt text-black"></i>
              <span>100% Seguro</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-clock text-black"></i>
              <span>24/7 Soporte</span>
            </div>
          </div>
        </div>

        <!-- Patrón decorativo -->
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-black opacity-10 transform rotate-45 translate-x-16 -translate-y-16"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 transform rotate-45 -translate-x-12 translate-y-12"
        ></div>
      </div>

      <!-- Panel derecho - Formularios -->
      <div class="w-full lg:w-1/2 p-8 lg:p-12">
        <!-- Header del formulario -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-black mb-2">
            {{ isLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
          </h2>
          <p class="text-gray-600">
            {{
              isLogin
                ? 'Accede a tu cuenta para continuar'
                : 'Únete a miles de usuarios satisfechos'
            }}
          </p>
        </div>

        <!-- Formulario de Login -->
        <div v-if="isLogin">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email -->
            <div>
              <label for="login-email" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-envelope text-yellow-600 mr-2"></i>
                Correo Electrónico
              </label>
              <input
                id="login-email"
                v-model="loginData.email"
                type="email"
                required
                placeholder="tu@ejemplo.com"
                class="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200 text-black placeholder-gray-500"
              />
            </div>

            <!-- Password -->
            <div>
              <label for="login-password" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-lock text-yellow-600 mr-2"></i>
                Contraseña
              </label>
              <input
                id="login-password"
                v-model="loginData.password"
                type="password"
                required
                placeholder="Tu contraseña segura"
                class="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200 text-black placeholder-gray-500"
              />
            </div>

            <!-- Forgot Password -->
            <div class="text-right">
              <a href="#" class="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              class="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <i class="fas fa-sign-in-alt"></i>
              Iniciar Sesión
            </button>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">O continúa con</span>
              </div>
            </div>

            <!-- Google Button -->
            <button
              type="button"
              @click="handleGoogleAuth"
              class="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 py-3 px-4 font-medium transition-all duration-200 flex items-center justify-center gap-3"
            >
              <img class="w-5 h-5" src="@/assets/google.svg" alt="Google" />
              Continuar con Google
            </button>
          </form>
        </div>

        <!-- Formulario de Signup -->
        <div v-else>
          <form @submit.prevent="handleSignup" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="signup-name" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-user text-yellow-600 mr-2"></i>
                Nombre Completo
              </label>
              <input
                id="signup-name"
                v-model="signupData.name"
                type="text"
                required
                placeholder="Tu nombre completo"
                class="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200 text-black placeholder-gray-500"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="signup-email" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-envelope text-yellow-600 mr-2"></i>
                Correo Electrónico
              </label>
              <input
                id="signup-email"
                v-model="signupData.email"
                type="email"
                required
                placeholder="tu@ejemplo.com"
                class="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200 text-black placeholder-gray-500"
              />
            </div>

            <!-- Password -->
            <div>
              <label for="signup-password" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-lock text-yellow-600 mr-2"></i>
                Contraseña
              </label>
              <input
                id="signup-password"
                v-model="signupData.password"
                type="password"
                required
                placeholder="Mínimo 8 caracteres"
                class="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200 text-black placeholder-gray-500"
              />
            </div>

            <!-- Confirm Password -->
            <div>
              <label
                for="signup-confirm-password"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                <i class="fas fa-check-circle text-yellow-600 mr-2"></i>
                Confirmar Contraseña
              </label>
              <input
                id="signup-confirm-password"
                v-model="signupData.confirmPassword"
                type="password"
                required
                placeholder="Repite tu contraseña"
                class="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200 text-black placeholder-gray-500"
              />
            </div>

            <!-- Terms -->
            <div class="flex items-start gap-3">
              <input type="checkbox" required class="mt-1" />
              <span class="text-sm text-gray-600">
                Acepto los
                <a href="#" class="text-yellow-600 hover:text-yellow-700 font-medium"
                  >Términos de Servicio</a
                >
                y la
                <a href="#" class="text-yellow-600 hover:text-yellow-700 font-medium"
                  >Política de Privacidad</a
                >
              </span>
            </div>

            <!-- Signup Button -->
            <button
              type="submit"
              class="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <i class="fas fa-user-plus"></i>
              Crear Cuenta
            </button>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">O regístrate con</span>
              </div>
            </div>

            <!-- Google Button -->
            <button
              type="button"
              @click="handleGoogleAuth"
              class="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 py-3 px-4 font-medium transition-all duration-200 flex items-center justify-center gap-3"
            >
              <img class="w-5 h-5" src="@/assets/google.svg" alt="Google" />
              Continuar con Google
            </button>
          </form>
        </div>

        <!-- Toggle entre Login y Signup -->
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            {{ isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?' }}
            <button
              @click="toggleMode"
              class="text-yellow-600 hover:text-yellow-700 font-semibold ml-1"
            >
              {{ isLogin ? 'Crear cuenta' : 'Iniciar sesión' }}
            </button>
          </p>
        </div>

        <!-- Features -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <div class="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
            <div>
              <i class="fas fa-lock text-yellow-600 mb-1"></i>
              <div>Seguro SSL</div>
            </div>
            <div>
              <i class="fas fa-users text-yellow-600 mb-1"></i>
              <div>+10K Usuarios</div>
            </div>
            <div>
              <i class="fas fa-star text-yellow-600 mb-1"></i>
              <div>Calificación 4.9</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animaciones personalizadas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus states mejorados */
input:focus {
  outline: none;
}

/* Hover effects para botones */
button:hover {
  transform: translateY(-1px);
}

/* Estilos para checkbox */
input[type='checkbox'] {
  accent-color: #fbbf24;
}
</style>
