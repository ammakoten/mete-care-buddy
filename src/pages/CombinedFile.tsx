
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CombinedFile = () => {
  // JavaScript logic
  const handleClick = () => {
    alert('Tombol diklik!');
  };

  const handleViewHTML = () => {
    // Open the HTML version in a new tab
    window.open("/combined-html.html", "_blank");
  };

  return (
    <div className="p-6">
      {/* HTML structure */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cashew-800 mb-4">Dokumen HTML, CSS dan JavaScript</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-cashew-700 mb-3">Pendahuluan</h2>
          <p className="mb-4">
            Ini adalah contoh dokumen yang menggabungkan HTML, CSS, dan JavaScript dalam satu file.
            Dalam pengembangan web modern, ketiga teknologi ini bekerja sama untuk membuat aplikasi web
            yang interaktif dan menarik.
          </p>
          
          {/* Elemen dengan styling khusus */}
          <div className="border-l-4 border-cashew-500 pl-4 bg-cashew-50 p-4 my-4">
            <h3 className="font-semibold text-cashew-600">HTML</h3>
            <p>Merupakan bahasa markup yang digunakan untuk membuat struktur halaman web</p>
          </div>
          
          <div className="border-l-4 border-cashew-500 pl-4 bg-cashew-50 p-4 my-4">
            <h3 className="font-semibold text-cashew-600">CSS</h3>
            <p>Merupakan bahasa styling yang digunakan untuk mengatur tampilan halaman web</p>
          </div>
          
          <div className="border-l-4 border-cashew-500 pl-4 bg-cashew-50 p-4 my-4">
            <h3 className="font-semibold text-cashew-600">JavaScript</h3>
            <p>Merupakan bahasa pemrograman yang digunakan untuk membuat interaksi di halaman web</p>
          </div>
          
          <h2 className="text-2xl font-semibold text-cashew-700 mt-6 mb-3">Tujuan Prototipe</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Menunjukkan integrasi antara HTML, CSS, dan JavaScript</li>
            <li>Memberikan contoh interaktivitas sederhana dengan JavaScript</li>
            <li>Menampilkan gaya dan layout dengan CSS</li>
            <li>Menjadi dokumen referensi untuk pengembangan aplikasi web</li>
          </ul>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={handleClick}
              className="bg-cashew-600 hover:bg-cashew-700"
            >
              Klik Saya!
            </Button>
            
            <Button
              onClick={handleViewHTML}
              className="bg-cashew-500 hover:bg-cashew-600 ml-4"
            >
              Lihat Versi HTML
            </Button>
            
            <div className="mt-4">
              <Link 
                to="/"
                className="text-cashew-600 hover:text-cashew-800 hover:underline"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-4 text-sm text-gray-500">
            <p>
              Pada pengembangan aplikasi web modern seperti React, HTML ditulis dalam bentuk JSX,
              CSS dapat diaplikasikan menggunakan framework seperti Tailwind CSS, dan JavaScript
              terintegrasi langsung dalam komponen yang sama.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedFile;
