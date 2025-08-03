'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (e: React.FormEvent) => {
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

    if (password.length < 1) {
      setModalData({
        title: 'Password Kosong',
        message: 'Silakan masukkan password Anda.',
        type: 'error'
      })
      setIsModalOpen(true)
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Handle specific error messages
        let errorMessage = error.message
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email atau password salah. Silakan cek kembali.'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Email belum diverifikasi. Silakan cek email Anda dan klik link verifikasi.'
        }

        setModalData({
          title: 'Login Gagal',
          message: errorMessage,
          type: 'error'
        })
        setIsModalOpen(true)
      } else {
        setModalData({
          title: 'Login Berhasil!',
          message: 'Selamat datang kembali! Anda akan dialihkan ke dashboard.',
          type: 'success'
        })
        setIsModalOpen(true)
        // Reset form
        setEmail('')
        setPassword('')
      }
    } catch {
      setModalData({
        title: 'Terjadi Kesalahan',
        message: 'Terjadi kesalahan saat login. Silakan coba lagi.',
        type: 'error'
      })
      setIsModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Jika login berhasil, redirect ke dashboard
    if (modalData.type === 'success') {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Login</h1>
        <form onSubmit={handleLogin}>
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
              placeholder="*******"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Login...' : 'Login'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-800">
              Daftar di sini
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