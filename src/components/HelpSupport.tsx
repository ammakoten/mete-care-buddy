
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  MessageCircle, 
  Book, 
  Phone, 
  Mail, 
  ExternalLink, 
  TreeDeciduous, 
  CalendarCheck, 
  BarChart,
  CloudSun,
  Settings,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

const HelpSupport = () => {
  const [supportMessage, setSupportMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !supportMessage) {
      toast.error('Mohon lengkapi email dan pesan Anda');
      return;
    }
    toast.success('Pesan bantuan berhasil dikirim. Tim support akan menghubungi Anda segera.');
    setSupportMessage('');
    setUserEmail('');
  };

  const handleOpenGuide = () => {
    toast.success('Membuka panduan pengguna...');
  };

  const handleOpenFAQ = () => {
    toast.success('Menampilkan FAQ...');
  };

  const faqData = [
    {
      question: "Bagaimana cara menambahkan pohon baru?",
      answer: "Untuk menambahkan pohon baru, masuk ke halaman 'Pohon', klik tombol 'Tambah Pohon Baru', lalu isi informasi yang diperlukan seperti varietas, lokasi, dan tanggal tanam."
    },
    {
      question: "Bagaimana cara mengatur jadwal pemeliharaan?",
      answer: "Di halaman 'Pemeliharaan', klik 'Buat Tugas Baru', pilih jenis pemeliharaan (penyiraman, pemupukan, dll), tentukan jadwal dan pohon yang akan dirawat."
    },
    {
      question: "Bagaimana cara melihat analitik produksi?",
      answer: "Halaman 'Analitik' menampilkan grafik dan statistik produksi, pertumbuhan pohon, efisiensi pemeliharaan, dan prediksi hasil panen berdasarkan data historis."
    },
    {
      question: "Apakah data cuaca otomatis terupdate?",
      answer: "Ya, data cuaca diperbarui secara otomatis setiap jam. Aplikasi juga memberikan peringatan jika kondisi cuaca dapat mempengaruhi kesehatan tanaman."
    },
    {
      question: "Bagaimana cara mengunduh laporan?",
      answer: "Di setiap halaman analitik, klik tombol 'Unduh Laporan' di pojok kanan atas. Anda dapat memilih format PDF atau Excel dan rentang waktu yang diinginkan."
    }
  ];

  const quickGuides = [
    {
      title: "Pengelolaan Pohon",
      description: "Pelajari cara menambah, mengedit, dan memantau pohon jambu mete",
      icon: TreeDeciduous,
      topics: ["Menambah pohon baru", "Mengatur lokasi pohon", "Memantau kesehatan pohon"]
    },
    {
      title: "Jadwal Pemeliharaan",
      description: "Panduan lengkap sistem pemeliharaan otomatis",
      icon: CalendarCheck,
      topics: ["Membuat jadwal penyiraman", "Pengaturan pemupukan", "Pengendalian hama"]
    },
    {
      title: "Analisis Data",
      description: "Memahami grafik dan laporan produksi",
      icon: BarChart,
      topics: ["Membaca grafik produksi", "Analisis tren pertumbuhan", "Prediksi hasil panen"]
    },
    {
      title: "Monitoring Cuaca",
      description: "Memanfaatkan data cuaca untuk optimasi hasil",
      icon: CloudSun,
      topics: ["Interpretasi data cuaca", "Peringatan cuaca ekstrim", "Penyesuaian jadwal pemeliharaan"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Access Section */}
      <Card className="shadow-sm border-cashew-200">
        <CardHeader className="pb-4 border-b border-cashew-100">
          <CardTitle className="flex items-center text-lg">
            <HelpCircle className="mr-3 h-5 w-5 text-cashew-600" />
            Pusat Bantuan
          </CardTitle>
          <p className="text-sm text-cashew-600 mt-1">
            Temukan jawaban atas pertanyaan Anda dengan cepat
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Button 
              onClick={handleOpenGuide}
              variant="outline" 
              className="flex items-center justify-start p-4 h-auto border-cashew-200 hover:bg-cashew-50 hover:border-cashew-300 transition-all"
            >
              <Book className="mr-3 h-5 w-5 text-cashew-600" />
              <div className="text-left">
                <div className="font-medium text-cashew-800">Panduan Pengguna</div>
                <div className="text-sm text-cashew-500">Tutorial lengkap penggunaan aplikasi</div>
              </div>
              <ExternalLink className="ml-auto h-4 w-4 text-cashew-400" />
            </Button>
            
            <Button 
              onClick={handleOpenFAQ}
              variant="outline" 
              className="flex items-center justify-start p-4 h-auto border-cashew-200 hover:bg-cashew-50 hover:border-cashew-300 transition-all"
            >
              <MessageCircle className="mr-3 h-5 w-5 text-cashew-600" />
              <div className="text-left">
                <div className="font-medium text-cashew-800">FAQ</div>
                <div className="text-sm text-cashew-500">Pertanyaan yang sering ditanyakan</div>
              </div>
              <ExternalLink className="ml-auto h-4 w-4 text-cashew-400" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Guides Section */}
      <Card className="shadow-sm border-cashew-200">
        <CardHeader className="pb-4 border-b border-cashew-100">
          <CardTitle className="text-lg text-cashew-800">Panduan Cepat</CardTitle>
          <p className="text-sm text-cashew-600 mt-1">
            Panduan singkat untuk fitur-fitur utama aplikasi
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {quickGuides.map((guide, index) => (
              <div key={index} className="border border-cashew-200 rounded-lg p-4 hover:bg-cashew-25 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="bg-cashew-100 p-2 rounded-lg">
                    <guide.icon className="h-5 w-5 text-cashew-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-cashew-800 mb-1">{guide.title}</h4>
                    <p className="text-sm text-cashew-600 mb-2">{guide.description}</p>
                    <ul className="text-xs text-cashew-500 space-y-1">
                      {guide.topics.map((topic, i) => (
                        <li key={i}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="shadow-sm border-cashew-200">
        <CardHeader className="pb-4 border-b border-cashew-100">
          <CardTitle className="text-lg text-cashew-800">Pertanyaan yang Sering Ditanyakan</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-cashew-200 rounded-lg px-4">
                <AccordionTrigger className="text-left hover:text-cashew-700 py-4">
                  <span className="font-medium text-cashew-800">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-cashew-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support Section */}
      <Card className="shadow-sm border-cashew-200">
        <CardHeader className="pb-4 border-b border-cashew-100">
          <CardTitle className="text-lg text-cashew-800">Hubungi Tim Dukungan</CardTitle>
          <p className="text-sm text-cashew-600 mt-1">
            Butuh bantuan lebih lanjut? Tim support kami siap membantu Anda
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Contact Methods */}
          <div className="grid gap-3 md:grid-cols-2">
            <Button 
              onClick={() => toast.success('Menghubungi: +62-800-1234-5678')}
              variant="outline" 
              className="flex items-center justify-center border-cashew-200 hover:bg-cashew-50 hover:border-cashew-300 py-3"
            >
              <Phone className="mr-2 h-4 w-4 text-cashew-600" />
              <span className="font-medium">Telepon Support</span>
            </Button>
            
            <Button 
              onClick={() => toast.success('Membuka email: support@jambumete.com')}
              variant="outline" 
              className="flex items-center justify-center border-cashew-200 hover:bg-cashew-50 hover:border-cashew-300 py-3"
            >
              <Mail className="mr-2 h-4 w-4 text-cashew-600" />
              <span className="font-medium">Email Support</span>
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Support Form */}
          <form onSubmit={handleSendSupport} className="space-y-4">
            <h4 className="font-medium text-cashew-800 mb-4">Kirim Pesan Bantuan</h4>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-cashew-700 mb-2 block">
                  Email Anda *
                </label>
                <Input 
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="border-cashew-200 focus:border-cashew-400"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-cashew-700 mb-2 block">
                  Kategori
                </label>
                <select className="w-full px-3 py-2 border border-cashew-200 rounded-md focus:border-cashew-400 focus:outline-none">
                  <option>Masalah Teknis</option>
                  <option>Bantuan Penggunaan</option>
                  <option>Saran & Masukan</option>
                  <option>Lainnya</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-cashew-700 mb-2 block">
                Pesan *
              </label>
              <Textarea 
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Deskripsikan masalah atau pertanyaan Anda dengan detail..."
                className="min-h-[120px] border-cashew-200 focus:border-cashew-400"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="bg-cashew-600 hover:bg-cashew-700 w-full py-3 font-medium"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Kirim Pesan Bantuan
            </Button>
          </form>

          {/* Support Info */}
          <div className="bg-gradient-to-r from-cashew-50 to-cashew-25 p-6 rounded-lg border border-cashew-200">
            <div className="flex items-start space-x-4">
              <div className="bg-cashew-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-cashew-600" />
              </div>
              <div>
                <h4 className="font-medium text-cashew-800 mb-3">Informasi Tim Dukungan</h4>
                <div className="grid gap-2 text-sm text-cashew-600">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-cashew-500" />
                    <span>Telepon: +62-800-1234-5678 (24/7)</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-cashew-500" />
                    <span>Email: support@jambumete.com</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2 text-cashew-500" />
                    <span>Waktu Respons: 1-24 jam (hari kerja)</span>
                  </div>
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-cashew-500" />
                    <span>Website: www.jambumete.com/help</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport;
