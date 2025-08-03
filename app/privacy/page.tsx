import Link from "next/link";

export default function PrivacyPage() {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Kebijakan Privasi</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Informasi yang Kami Kumpulkan</h2>
              <p className="text-gray-600 mb-4">
                Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Informasi akun (nama, email, password)</li>
                <li>Data quiz yang Anda buat</li>
                <li>Hasil quiz yang Anda kerjakan</li>
                <li>Informasi penggunaan platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Bagaimana Kami Menggunakan Informasi</h2>
              <p className="text-gray-600 mb-4">
                Kami menggunakan informasi yang kami kumpulkan untuk:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Menyediakan dan memelihara layanan platform</li>
                <li>Memproses dan menyimpan quiz yang Anda buat</li>
                <li>Menampilkan hasil quiz dan statistik</li>
                <li>Meningkatkan pengalaman pengguna</li>
                <li>Mengirim notifikasi penting terkait layanan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Keamanan Data</h2>
              <p className="text-gray-600 mb-4">
                Kami menerapkan langkah-langkah keamanan yang tepat untuk melindungi informasi Anda:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Enkripsi data menggunakan protokol SSL/TLS</li>
                <li>Autentikasi yang aman dengan Supabase Auth</li>
                <li>Row Level Security (RLS) untuk akses database</li>
                <li>Backup data secara berkala</li>
                <li>Monitoring keamanan 24/7</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Berbagi Informasi</h2>
              <p className="text-gray-600 mb-4">
                Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Untuk memenuhi kewajiban hukum</li>
                <li>Untuk melindungi hak dan keamanan pengguna</li>
                <li>Dengan penyedia layanan yang membantu operasi platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Hak Pengguna</h2>
              <p className="text-gray-600 mb-4">
                Anda memiliki hak untuk:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Mengakses data pribadi Anda</li>
                <li>Memperbarui atau mengoreksi informasi yang tidak akurat</li>
                <li>Menghapus akun dan data Anda</li>
                <li>Mengekspor data Anda</li>
                <li>Menolak pengumpulan data tertentu</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookie dan Teknologi Pelacakan</h2>
              <p className="text-gray-600 mb-4">
                Kami menggunakan cookie dan teknologi serupa untuk:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Mengingat preferensi pengguna</li>
                <li>Menganalisis penggunaan platform</li>
                <li>Meningkatkan performa website</li>
                <li>Menyediakan konten yang dipersonalisasi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Perubahan Kebijakan</h2>
              <p className="text-gray-600 mb-4">
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Notifikasi di platform</li>
                <li>Email kepada pengguna terdaftar</li>
                <li>Update di halaman ini</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Kontak Kami</h2>
              <p className="text-gray-600 mb-4">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@quizplatform.com<br/>
                  <strong>Telepon:</strong> +62 812-3456-7890<br/>
                  <strong>Alamat:</strong> Jakarta, Indonesia<br/>
                  <strong>Jam Kerja:</strong> Senin - Jumat, 09:00 - 17:00 WIB
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Tanggal Efektif</h2>
              <p className="text-gray-600">
                Kebijakan privasi ini berlaku efektif mulai tanggal 1 Januari 2024 dan terakhir diperbarui pada tanggal 3 Agustus 2024.
              </p>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
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
                <li><Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
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