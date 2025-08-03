import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <div className="text-2xl mr-2">🎯</div>
                  <span className="text-xl font-bold text-gray-900">QuizPlatform</span>
                </Link>
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
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tentang <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">QuizPlatform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Platform kuis interaktif yang mengubah cara belajar menjadi lebih menyenangkan dan efektif
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Misi Kami</h2>
              <p className="text-lg text-gray-600 mb-4">
                Menyediakan platform pembelajaran yang inovatif dan mudah diakses untuk semua kalangan, 
                dari siswa hingga profesional, dalam rangka meningkatkan kualitas pendidikan di Indonesia.
              </p>
              <p className="text-lg text-gray-600">
                Kami percaya bahwa belajar seharusnya menyenangkan, interaktif, dan memberikan 
                feedback yang cepat untuk memaksimalkan proses pembelajaran.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🌟 Visi Kami</h2>
              <p className="text-lg text-gray-600 mb-4">
                Menjadi platform quiz terdepan di Indonesia yang digunakan oleh jutaan pengguna 
                untuk membuat, berbagi, dan mengerjakan kuis dengan cara yang modern dan efektif.
              </p>
              <p className="text-lg text-gray-600">
                Kami berkomitmen untuk terus berinovasi dan memberikan pengalaman terbaik 
                bagi pengguna kami dalam perjalanan belajar mereka.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-xl text-gray-600">
              Prinsip yang menjadi dasar pengembangan platform kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Inovasi</h3>
              <p className="text-gray-600">
                Terus berinovasi dalam teknologi dan fitur untuk memberikan pengalaman terbaik bagi pengguna.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Kolaborasi</h3>
              <p className="text-gray-600">
                Mendorong kolaborasi antar pengguna dalam berbagi pengetahuan dan pengalaman belajar.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pendidikan</h3>
              <p className="text-gray-600">
                Berkomitmen untuk meningkatkan kualitas pendidikan melalui teknologi yang mudah diakses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tim Kami</h2>
            <p className="text-xl text-gray-600">
              Dipimpin oleh tim yang berdedikasi untuk mengubah cara belajar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white font-bold">
                A
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ario Veisa</h3>
              <p className="text-gray-600 mb-2">Founder & CEO</p>
              <p className="text-sm text-gray-500">
                Pengembang platform dengan visi untuk mengubah cara belajar di Indonesia
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white font-bold">
                D
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Development Team</h3>
              <p className="text-gray-600 mb-2">Full Stack Developers</p>
              <p className="text-sm text-gray-500">
                Tim pengembang yang handal dalam teknologi modern dan user experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white font-bold">
                U
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User Community</h3>
              <p className="text-gray-600 mb-2">Pengguna Aktif</p>
              <p className="text-sm text-gray-500">
                Komunitas pengguna yang memberikan feedback berharga untuk pengembangan platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Teknologi Kami</h2>
            <p className="text-xl text-gray-600">
              Dibangun dengan teknologi modern untuk performa terbaik
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl text-center shadow-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900">Next.js</h3>
              <p className="text-sm text-gray-600">React Framework</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl text-center shadow-lg">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold text-gray-900">Supabase</h3>
              <p className="text-sm text-gray-600">Backend & Database</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl text-center shadow-lg">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-gray-900">Tailwind CSS</h3>
              <p className="text-sm text-gray-600">Styling Framework</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl text-center shadow-lg">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900">TypeScript</h3>
              <p className="text-sm text-gray-600">Type Safety</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bergabunglah Dengan Kami
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Mulai perjalanan belajar yang menyenangkan bersama ribuan pengguna lainnya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Mulai Sekarang
            </Link>
            <Link 
              href="/"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              🏠 Kembali ke Beranda
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
                <li>Tentang Kami</li>
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