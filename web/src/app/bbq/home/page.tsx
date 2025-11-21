import styles from "../bbq.module.css";

export default function HomePage() {
  return (
    <>
      {/* Tombol Login */}
      <nav className="mt-2.5 mx-5 flex md:justify-end sm:justify-start justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
        </button>
      </nav>

      {/* content */}
      <article className={styles.content}>
        <h1 className="text-3xl font-bold mb-4">
          Selamat Datang di Aplikasi BBQ-ARRRAHMAN
        </h1>

        <p>
          Aplikasi BBQ-ARRRAHMAN adalah sebuah platform yang dirancang untuk
          membantu Anda mengelola data barang dengan mudah dan efisien. Dengan
          antarmuka yang user-friendly, Anda dapat menambahkan, melihat,
          memperbarui, dan menghapus data barang sesuai kebutuhan Anda.
        </p>

        <p>Fitur-fitur utama dari aplikasi ini meliputi:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Tambah Data Barang: Memungkinkan Anda untuk menambahkan informasi
            barang baru ke dalam sistem.
          </li>
          <li>
            Lihat Data Barang: Menyediakan tampilan daftar barang yang telah
            disimpan beserta detailnya.
          </li>
          <li>
            Perbarui Data Barang: Memudahkan Anda untuk memperbarui informasi
            barang yang sudah ada.
          </li>
          <li>
            Hapus Data Barang: Memberikan opsi untuk menghapus data barang yang
            tidak lagi diperlukan.
          </li>
        </ul>
      </article>
    </>
  );
}
