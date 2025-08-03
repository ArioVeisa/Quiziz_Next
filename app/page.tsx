import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="text-2xl mr-2">🎯</div>
                  <span className="text-xl font-bold text-gray-900">QuizPlatform</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Belajar Jadi
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Lebih Menyenangkan</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Platform kuis interaktif untuk membuat, membagikan, dan mengerjakan soal latihan dengan cara yang menyenangkan dan efektif.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Mulai Gratis Sekarang
              </Link>
              <Link 
                href="/quiz/play/9Y7I5G"
                className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-200"
              >
                🎮 Coba Demo Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nikmati pengalaman belajar yang berbeda dengan fitur-fitur canggih kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Buat Quiz Mudah</h3>
              <p className="text-gray-600">
                Buat kuis pilihan ganda dengan interface yang user-friendly. Tambahkan pertanyaan, opsi jawaban, dan jawaban benar dengan mudah.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bagikan Via Link</h3>
              <p className="text-gray-600">
                Setiap quiz memiliki link unik yang bisa dibagikan ke siapa saja. Tidak perlu login untuk mengerjakan quiz.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hasil Real-time</h3>
              <p className="text-gray-600">
                Lihat hasil quiz secara instan dengan detail jawaban benar dan salah. Track progress belajar Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cara Kerja Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hanya butuh 3 langkah sederhana untuk mulai menggunakan platform kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Daftar & Login</h3>
              <p className="text-gray-600">
                Buat akun gratis dan login untuk mengakses semua fitur platform
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Buat Quiz</h3>
              <p className="text-gray-600">
                Buat quiz dengan pertanyaan pilihan ganda dan tentukan jawaban benar
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bagikan & Mainkan</h3>
              <p className="text-gray-600">
                Bagikan link quiz dan mainkan bersama teman atau siswa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Untuk Mulai?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaat platform quiz kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Daftar Sekarang
            </Link>
            <Link 
              href="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              🔐 Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-2">🎯</div>
                <span className="text-xl font-bold">QuizPlatform</span>
              </div>
              <p className="text-gray-400">
                Platform kuis interaktif untuk belajar yang lebih menyenangkan dan efektif.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Fitur</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Buat Quiz</li>
                <li>Bagikan Link</li>
                <li>Hasil Real-time</li>
                <li>Dashboard Analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li>Kebijakan Privasi</li>
                <li>Syarat & Ketentuan</li>
                <li>Bantuan</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@quizplatform.com</li>
                <li>Telepon: +62 812-3456-7890</li>
                <li>Alamat: Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QuizPlatform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
