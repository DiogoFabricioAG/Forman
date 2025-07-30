<template>
  <div class="flex h-screen bg-black">
    <!-- Barra lateral -->
    <aside class="w-80 text-white shadow-2xl">
      <div class="p-6">
        <!-- Información del usuario -->
        <div class="text-center mb-8 pb-6 border-b border-white/80">
          <div class="mb-4">
            <div class="w-16 h-16 bg-yellow-400 flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-user text-2xl text-white"></i>
            </div>
            <h3 class="text-lg font-semibold text-white">{{ userName }}</h3>
          </div>
        </div>

        <!-- Navegación -->
        <nav>
          <ul class="space-y-3">
            <li>
              <button
                @click="activeSection = 'desarrollar'"
                :class="[
                  'w-full p-4 text-left transition-all duration-300 flex items-center gap-4 text-sm font-medium',
                  activeSection === 'desarrollar'
                    ? 'bg-yellow-400 text-black shadow-lg transform translate-x-1'
                    : 'hover:bg-gray-200 hover:text-black hover:transform hover:translate-x-1',
                ]"
              >
                <i class="fas fa-edit text-lg"></i>
                Desarrollar Formatos
              </button>
            </li>
            <li>
              <button
                @click="activeSection = 'historial'"
                :class="[
                  'w-full p-4 text-left transition-all duration-300 flex items-center gap-4 text-sm font-medium',
                  activeSection === 'historial'
                    ? 'bg-yellow-400 text-black shadow-lg transform translate-x-1'
                    : 'hover:bg-gray-200 hover:text-black hover:transform hover:translate-x-1',
                ]"
              >
                <i class="fas fa-history text-lg"></i>
                Historial Formatos
              </button>
            </li>
            <li>
              <button
                @click="activeSection = 'pricing'"
                :class="[
                  'w-full p-4 text-left transition-all duration-300 flex items-center gap-4 text-sm font-medium',
                  activeSection === 'pricing'
                    ? 'bg-yellow-400 text-black shadow-lg transform translate-x-1'
                    : 'hover:bg-gray-200 hover:text-black hover:transform hover:translate-x-1',
                ]"
              >
                <i class="fas fa-crown text-lg"></i>
                Pricing
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="flex-1 overflow-y-auto bg-black">
      <!-- Sección Desarrollar Formatos -->
      <div v-if="activeSection === 'desarrollar'" class="p-8">
        <h2 class="text-3xl font-bold text-white mb-8">Desarrollar Formatos</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-160px)]">
          <!-- Panel de archivos/documentos -->
          <div class="bg-white p-6 border border-yellow-400 overflow-y-auto">
            <h3 class="text-xl font-semibold text-black mb-6 flex items-center gap-3">
              <i class="fas fa-folder-open text-yellow-500"></i>
              Documentos y Archivos
            </h3>

            <!-- Botón de subir archivos -->
            <div class="mb-6">
              <input
                type="file"
                @change="handleFileUpload"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                ref="fileInput"
                class="hidden"
              />
              <button
                @click="$refs.fileInput.click()"
                class="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-4 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
              >
                <i class="fas fa-plus"></i>
                Adjuntar Archivos
              </button>
            </div>

            <!-- Lista de archivos -->
            <div class="mb-6">
              <div class="bg-gray-100 p-4 max-h-48 overflow-y-auto border border-gray-300">
                <div
                  v-for="file in uploadedFiles"
                  :key="file.id"
                  class="flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 mb-2 last:mb-0"
                  :class="
                    selectedFile?.id === file.id
                      ? 'bg-yellow-400 border border-black text-black'
                      : 'hover:bg-gray-200 text-gray-800'
                  "
                  @click="selectFile(file)"
                >
                  <i class="fas fa-file-alt text-yellow-600"></i>
                  <span class="flex-1 text-sm truncate">{{ file.name }}</span>
                  <button
                    @click.stop="removeFile(file.id)"
                    class="text-red-600 hover:text-red-800 transition-colors p-1"
                  >
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </div>
                <div
                  v-if="uploadedFiles.length === 0"
                  class="text-gray-500 text-sm text-center py-4"
                >
                  No hay archivos subidos
                </div>
              </div>
            </div>

            <!-- Sección de agregar texto -->
            <div>
              <h4 class="text-lg font-medium text-black mb-3 flex items-center gap-2">
                <i class="fas fa-text-height text-yellow-600"></i>
                Agregar Texto
              </h4>
              <textarea
                v-model="newTextContent"
                placeholder="Escrive o pega tu texto aquí..."
                class="w-full bg-white border border-gray-300 p-4 text-black placeholder-gray-500 resize-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200"
                rows="4"
              ></textarea>
              <button
                @click="addTextDocument"
                class="mt-3 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 transition-all duration-300 flex items-center gap-2 font-medium"
                :disabled="!newTextContent.trim()"
                :class="!newTextContent.trim() ? 'opacity-50 cursor-not-allowed' : ''"
              >
                <i class="fas fa-plus"></i>
                Agregar Texto
              </button>
            </div>
          </div>

          <!-- Panel del Chatbot -->
          <div class="bg-white p-6 border border-yellow-400 flex flex-col">
            <h3 class="text-xl font-semibold text-black mb-6 flex items-center gap-3">
              <i class="fas fa-robot text-yellow-600"></i>
              Asistente IA
            </h3>

            <!-- Contenedor del chat -->
            <div class="flex-1 flex flex-col">
              <!-- Mensajes del chat -->
              <div
                class="flex-1 bg-gray-100 p-4 mb-4 overflow-y-auto border border-gray-300"
                ref="chatMessages"
              >
                <div v-for="message in chatMessages" :key="message.id" class="mb-4 last:mb-0">
                  <div
                    :class="[
                      'max-w-[80%] p-4',
                      message.type === 'user'
                        ? 'bg-yellow-400 text-black ml-auto'
                        : 'bg-white text-black border border-gray-300',
                    ]"
                  >
                    <div class="text-sm">{{ message.content }}</div>
                  </div>
                  <div
                    :class="[
                      'text-xs text-gray-600 mt-2',
                      message.type === 'user' ? 'text-right' : 'text-left',
                    ]"
                  >
                    {{ formatTime(message.timestamp) }}
                  </div>
                </div>
              </div>

              <!-- Indicador de archivo seleccionado -->
              <div
                v-if="selectedFile"
                class="bg-yellow-400 border border-black p-3 mb-4 flex items-center gap-2"
              >
                <i class="fas fa-file text-black"></i>
                <span class="text-black text-sm"
                  >Archivo seleccionado: {{ selectedFile.name }}</span
                >
              </div>

              <!-- Input del chat -->
              <div class="flex gap-3">
                <textarea
                  v-model="chatInput"
                  @keydown.enter.prevent="sendMessage"
                  placeholder="Escribe tu mensaje al asistente..."
                  class="flex-1 bg-white border border-gray-300 p-4 text-black placeholder-gray-500 resize-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200"
                  rows="3"
                ></textarea>
                <button
                  @click="sendMessage"
                  :disabled="!chatInput.trim()"
                  :class="[
                    'px-4 py-2 transition-all duration-300 flex items-center justify-center',
                    chatInput.trim()
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                  ]"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección Historial de Formatos -->
      <div v-if="activeSection === 'historial'" class="p-8">
        <h2 class="text-3xl font-bold text-white mb-8">Historial de Formatos</h2>

        <!-- Filtros -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            v-model="searchFilter"
            type="text"
            placeholder="Buscar en historial..."
            class="flex-1 outline-none bg-white border border-yellow-400 px-4 py-3 text-black placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200"
          />
          <select
            v-model="statusFilter"
            class="bg-white outline-none border border-yellow-400 px-4 py-3 text-black focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-200 min-w-[200px]"
          >
            <option value="">Todos los estados</option>
            <option value="completado">Completado</option>
            <option value="en-proceso">En Proceso</option>
            <option value="borrador">Borrador</option>
          </select>
        </div>

        <!-- Lista de formatos -->
        <div class="bg-white border border-yellow-400 overflow-hidden">
          <div
            v-for="formato in filteredFormatos"
            :key="formato.id"
            class="p-6 border-b border-gray-300 last:border-b-0 hover:bg-gray-100 transition-colors duration-200"
          >
            <!-- Header del formato -->
            <div class="flex justify-between items-center mb-4">
              <h4 class="text-xl font-semibold text-black">{{ formato.title }}</h4>
              <span
                :class="[
                  'px-3 py-1 text-xs font-semibold uppercase tracking-wide',
                  formato.status === 'completado'
                    ? 'bg-yellow-400 text-black border border-black'
                    : '',
                  formato.status === 'en-proceso'
                    ? 'bg-gray-300 text-black border border-gray-600'
                    : '',
                  formato.status === 'borrador' ? 'bg-gray-800 text-white border border-black' : '',
                ]"
              >
                {{ formatStatus(formato.status) }}
              </span>
            </div>

            <!-- Detalles del formato -->
            <div class="mb-4">
              <p class="text-gray-700 mb-3 text-sm leading-relaxed">{{ formato.description }}</p>
              <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-2">
                  <i class="fas fa-calendar text-yellow-600"></i>
                  {{ formatDate(formato.createdAt) }}
                </span>
                <span class="flex items-center gap-2">
                  <i class="fas fa-tag text-yellow-600"></i>
                  {{ formato.type }}
                </span>
              </div>
            </div>

            <!-- Acciones -->
            <div class="flex flex-wrap gap-3">
              <button
                @click="viewFormato(formato)"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 transition-all duration-200 flex items-center gap-2 text-sm font-medium"
              >
                <i class="fas fa-eye"></i>
                Ver
              </button>
              <button
                @click="editFormato(formato)"
                class="bg-white hover:bg-gray-100 text-black border border-black px-4 py-2 transition-all duration-200 flex items-center gap-2 text-sm font-medium"
              >
                <i class="fas fa-edit"></i>
                Editar
              </button>
              <button
                @click="downloadFormato(formato)"
                class="bg-black hover:bg-gray-800 text-white px-4 py-2 transition-all duration-200 flex items-center gap-2 text-sm font-medium"
              >
                <i class="fas fa-download"></i>
                Descargar
              </button>
              <button
                @click="deleteFormato(formato.id)"
                class="bg-gray-800 hover:bg-black text-white px-4 py-2 transition-all duration-200 flex items-center gap-2 text-sm font-medium"
              >
                <i class="fas fa-trash"></i>
                Eliminar
              </button>
            </div>
          </div>

          <!-- Estado vacío -->
          <div v-if="filteredFormatos.length === 0" class="text-center py-16">
            <i class="fas fa-inbox text-6xl text-gray-400 mb-4"></i>
            <p class="text-gray-600 text-lg">No se encontraron formatos en el historial</p>
          </div>
        </div>
      </div>

      <!-- Sección Pricing -->
      <div v-if="activeSection === 'pricing'" class="p-8">
        <h2 class="text-3xl font-bold text-white mb-8">Planes y Precios</h2>

        <div class="text-center mb-12">
          <p class="text-gray-300 text-lg mb-4">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
          <p class="text-yellow-400 text-sm">
            <i class="fas fa-shield-alt mr-2"></i>
            Cancela cuando quieras • Sin compromisos a largo plazo
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Plan Free -->
          <div class="bg-white border border-gray-300 p-8 text-black relative">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold mb-2">Free</h3>
              <div class="mb-4">
                <span class="text-4xl font-bold">$0</span>
                <span class="text-gray-600">/mes</span>
              </div>
              <p class="text-gray-600">Perfecto para empezar</p>
            </div>

            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">5 formatos por mes</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Plantillas básicas</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Chat con IA limitado</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Exportar PDF</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Soporte por email</span>
              </li>
            </ul>

            <button
              class="w-full bg-gray-200 hover:bg-gray-300 text-black py-3 px-4 font-medium transition-colors"
            >
              Plan Actual
            </button>
          </div>

          <!-- Plan Pay as You Go -->
          <div class="bg-white border border-yellow-400 p-8 text-black relative">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold mb-2">Pay as You Go</h3>
              <div class="mb-4">
                <span class="text-4xl font-bold">$2</span>
                <span class="text-gray-600">/formato</span>
              </div>
              <p class="text-gray-600">Paga solo lo que uses</p>
            </div>

            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Formatos ilimitados</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Chat IA avanzado</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Múltiples formatos de export</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Plantillas premium</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-yellow-600"></i>
                <span class="text-sm">Historial completo</span>
              </li>
            </ul>

            <button
              class="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-4 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-credit-card"></i>
              Seleccionar Plan
            </button>
          </div>

          <!-- Plan Monthly Pro -->
          <div class="bg-yellow-400 border border-black p-8 text-black relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="bg-black text-white px-4 py-1 text-sm font-bold">POPULAR</span>
            </div>

            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold mb-2">Pro Monthly</h3>
              <div class="mb-4">
                <span class="text-4xl font-bold">$29</span>
                <span class="text-gray-800">/mes</span>
              </div>
              <p class="text-gray-800">Todo incluido + extras</p>
            </div>

            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-black"></i>
                <span class="text-sm">Formatos ilimitados</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-black"></i>
                <span class="text-sm">IA premium sin límites</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-black"></i>
                <span class="text-sm">Plantillas premium exclusivas</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-black"></i>
                <span class="text-sm">Colaboración en equipo</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-black"></i>
                <span class="text-sm">Soporte prioritario 24/7</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-check text-black"></i>
                <span class="text-sm">API access</span>
              </li>
            </ul>

            <button
              class="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-star"></i>
              Upgrade a Pro
            </button>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="text-center mt-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="text-center">
              <i class="fas fa-lock text-yellow-400 text-2xl mb-2"></i>
              <h4 class="text-white font-semibold mb-1">Seguro y Confiable</h4>
              <p class="text-gray-400 text-sm">
                Tus datos protegidos con encriptación de grado militar
              </p>
            </div>
            <div class="text-center">
              <i class="fas fa-sync-alt text-yellow-400 text-2xl mb-2"></i>
              <h4 class="text-white font-semibold mb-1">Actualización Automática</h4>
              <p class="text-gray-400 text-sm">Nuevas funciones y mejoras sin costo adicional</p>
            </div>
            <div class="text-center">
              <i class="fas fa-headset text-yellow-400 text-2xl mb-2"></i>
              <h4 class="text-white font-semibold mb-1">Soporte Experto</h4>
              <p class="text-gray-400 text-sm">Equipo dedicado para ayudarte cuando lo necesites</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'

// Estado reactivo
const activeSection = ref('desarrollar')
const userName = ref('Usuario Demo')

// Estados para archivos y documentos
const uploadedFiles = ref([])
const selectedFile = ref(null)
const newTextContent = ref('')

// Estados para el chat
const chatMessages = ref([
  {
    id: 1,
    type: 'bot',
    content:
      '¡Hola! Soy tu asistente IA. Puedo ayudarte a desarrollar formatos basados en los documentos que subas. ¿En qué puedo ayudarte hoy?',
    timestamp: new Date(),
  },
])
const chatInput = ref('')

// Estados para el historial
const searchFilter = ref('')
const statusFilter = ref('')
const formatosHistorial = ref([
  {
    id: 1,
    title: 'Formato de Evaluación de Desempeño',
    description: 'Plantilla para evaluaciones anuales de empleados',
    status: 'completado',
    type: 'Recursos Humanos',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    title: 'Formato de Solicitud de Vacaciones',
    description: 'Formulario para solicitudes de tiempo libre',
    status: 'en-proceso',
    type: 'Administrativo',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 3,
    title: 'Formato de Reporte de Gastos',
    description: 'Plantilla para reportes de gastos de viaje',
    status: 'completado',
    type: 'Finanzas',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 4,
    title: 'Formato de Evaluación de Proveedores',
    description: 'Criterios para evaluación de proveedores',
    status: 'borrador',
    type: 'Compras',
    createdAt: new Date('2024-03-25'),
  },
  {
    id: 5,
    title: 'Formato de Capacitación',
    description: 'Registro de actividades de capacitación',
    status: 'completado',
    type: 'Recursos Humanos',
    createdAt: new Date('2024-04-05'),
  },
])

// Computed properties
const filteredFormatos = computed(() => {
  let filtered = formatosHistorial.value

  if (searchFilter.value) {
    const search = searchFilter.value.toLowerCase()
    filtered = filtered.filter(
      (formato) =>
        formato.title.toLowerCase().includes(search) ||
        formato.description.toLowerCase().includes(search) ||
        formato.type.toLowerCase().includes(search),
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter((formato) => formato.status === statusFilter.value)
  }

  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// Métodos para manejo de archivos
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach((file) => {
    const newFile = {
      id: Date.now() + Math.random(),
      name: file.name,
      file: file,
      type: 'file',
    }
    uploadedFiles.value.push(newFile)
  })
  event.target.value = ''
}

const selectFile = (file) => {
  selectedFile.value = file
}

const removeFile = (fileId) => {
  uploadedFiles.value = uploadedFiles.value.filter((file) => file.id !== fileId)
  if (selectedFile.value?.id === fileId) {
    selectedFile.value = null
  }
}

const addTextDocument = () => {
  if (newTextContent.value.trim()) {
    const textDoc = {
      id: Date.now(),
      name: `Texto ${uploadedFiles.value.length + 1}`,
      content: newTextContent.value,
      type: 'text',
    }
    uploadedFiles.value.push(textDoc)
    newTextContent.value = ''
  }
}

// Métodos para el chat
const sendMessage = async () => {
  if (!chatInput.value.trim()) return

  const userMessage = {
    id: Date.now(),
    type: 'user',
    content: chatInput.value,
    timestamp: new Date(),
  }

  chatMessages.value.push(userMessage)

  const userInput = chatInput.value
  chatInput.value = ''

  // Simular respuesta del bot
  setTimeout(() => {
    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      content: generateBotResponse(userInput),
      timestamp: new Date(),
    }
    chatMessages.value.push(botResponse)
    scrollToBottom()
  }, 1000)

  scrollToBottom()
}

const generateBotResponse = (userInput) => {
  const responses = [
    'Entiendo tu solicitud. Basándome en los documentos que has subido, puedo ayudarte a crear un formato personalizado.',
    'Excelente pregunta. Te sugiero que primero definamos la estructura del formato que necesitas.',
    'Puedo analizar el contenido de tus documentos y generar un formato optimizado para tus necesidades.',
    'Basándome en tu input, creo que podríamos desarrollar un formato que incluya los elementos clave que mencionas.',
    'Te ayudo a estructurar esa información. ¿Qué campos específicos necesitas incluir en el formato?',
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

const scrollToBottom = () => {
  nextTick(() => {
    const messagesContainer = document.querySelector('.chat-messages')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  })
}

// Métodos para el historial
const viewFormato = (formato) => {
  alert(`Viendo formato: ${formato.title}`)
}

const editFormato = (formato) => {
  alert(`Editando formato: ${formato.title}`)
}

const downloadFormato = (formato) => {
  alert(`Descargando formato: ${formato.title}`)
}

const deleteFormato = (formatoId) => {
  if (confirm('¿Estás seguro de que quieres eliminar este formato?')) {
    formatosHistorial.value = formatosHistorial.value.filter((f) => f.id !== formatoId)
  }
}

// Métodos de utilidad
const formatTime = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

const formatStatus = (status) => {
  const statusMap = {
    completado: 'Completado',
    'en-proceso': 'En Proceso',
    borrador: 'Borrador',
  }
  return statusMap[status] || status
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
/* Estilo personalizado para el estado hover en grises */
.hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

/* Estilos para el scroll personalizado con colores permitidos */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #ffffff;
  border: 1px solid #000000;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #fbbf24;
  border: 1px solid #000000;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #f59e0b;
}

/* Animación suave para transiciones */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
