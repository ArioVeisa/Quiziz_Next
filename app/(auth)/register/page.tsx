'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()
  const supabase = createClient()
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  })
  const [isLoading, setIsLoading] = useState(false)
  
  // Validasi email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validasi password
  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validasi client-side
    if (!validateEmail(email)) {
      setModalData({
        title: 'Email Tidak Valid',
        message: 'Silakan masukkan alamat email yang valid.',
        type: 'error'
      })
      setIsModalOpen(true)
      setIsLoading(false)
      return
    }

    if (!validatePassword(password)) {
      setModalData({
        title: 'Password Terlalu Pendek',
        message: 'Password harus minimal 6 karakter.',
        type: 'error'
      })
      setIsModalOpen(true)
      setIsLoading(false)
      return
    }

    if (name.trim().length < 2) {
      setModalData({
        title: 'Nama Terlalu Pendek',
        message: 'Nama lengkap harus minimal 2 karakter.',
        type: 'error'
      })
      setIsModalOpen(true)
      setIsLoading(false)
      return
    }

    try {
      // Proses registrasi
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        // Cek apakah error karena email sudah terdaftar
        if (error.message.includes('already registered') || 
            error.message.includes('already exists') ||
            error.message.includes('already been registered')) {
          setModalData({
            title: 'Email Sudah Terdaftar',
            message: 'Email ini sudah terdaftar dalam sistem. Silakan gunakan email lain atau login jika Anda sudah memiliki akun.',
            type: 'error'
          })
        } else {
          setModalData({
            title: 'Registrasi Gagal',
            message: error.message,
            type: 'error'
          })
        }
        setIsModalOpen(true)
      } else {
        setModalData({
          title: 'Registrasi Berhasil!',
          message: 'Akun Anda berhasil dibuat. Silakan cek email Anda untuk verifikasi sebelum login.',
          type: 'success'
        })
        setIsModalOpen(true)
        // Reset form
        setEmail('')
        setPassword('')
        setName('')
      }
    } catch {
      setModalData({
        title: 'Terjadi Kesalahan',
        message: 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.',
        type: 'error'
      })
      setIsModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Jika registrasi berhasil, redirect ke login
    if (modalData.type === 'success') {
      router.push('/login')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
              placeholder="contoh@email.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
              placeholder="Minimal 6 karakter"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Mendaftar...' : 'Register'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Sudah punya akun?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800">
              Login di sini
            </a>
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalData.title}
        message={modalData.message}
        type={modalData.type}
      />
    </div>
  )
}