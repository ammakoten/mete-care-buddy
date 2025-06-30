
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
  Users,
  FileText,
  Video,
  Download
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
      color: "from-green-100 to-emerald-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Jadwal Pemeliharaan",
      description: "Panduan lengkap sistem pemeliharaan otomatis",
      icon: CalendarCheck,
      color: "from-blue-100 to-cyan-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Analisis Data",
      description: "Memahami grafik dan laporan produksi",
      icon: BarChart,
      color: "from-purple-100 to-violet-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Monitoring Cuaca",
      description: "Memanfaatkan data cuaca untuk optimasi hasil",
      icon: CloudSun,
      color: "from-orange-100 to-amber-100",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  const resourceLinks = [
    { title: "Panduan Pengguna Lengkap", icon: Book, type: "PDF" },
    { title: "Video Tutorial", icon: Video, type: "Video" },
    { title: "Template Laporan", icon: FileText, type: "Excel" },
    { title: "Manual Instalasi", icon: Download, type: "PDF" }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center bg-gradient-to-r from-cashew-50 to-white rounded-2xl p-8 border border-cashew-200">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cashew-100 rounded-full mb-4">
          <HelpCircle className="h-8 w-8 text-cashew-600" />
        </div>
        <h1 className="text-2xl font-bold text-cashew-800 mb-2">
          Pusat Bantuan & Dukungan
        </h1>
        <p className="text-cashew-600 max-w-2xl mx-auto">
          Temukan jawaban atas pertanyaan Anda, akses panduan lengkap, atau hubungi tim support kami untuk bantuan lebih lanjut
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg border-cashew-200 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4 bg-gradient-to-r from-cashew-50 to-white border-b border-cashew-100">
            <CardTitle className="flex items-center text-lg">
              <Book className="mr-3 h-6 w-6 text-cashew-600" />
              Sumber Daya
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {resourceLinks.map((resource, index) => (
                <Button 
                  key={index}
                  onClick={() => toast.success(`Mengunduh ${resource.title}...`)}
                  variant="outline" 
                  className="w-full flex items-center justify-between p-4 h-auto border-cashew-200 hover:bg-cashew-50 hover:border-cashew-300 transition-all"
                >
                  <div className="flex items-center">
                    <resource.icon className="mr-3 h-5 w-5 text-cashew-600" />
                    <span className="font-medium text-cashew-800">{resource.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-cashew-100 text-cashew-700 px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                    <Download className="h-4 w-4 text-cashew-400" />
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-cashew-200 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4 bg-gradient-to-r from-cashew-50 to-white border-b border-cashew-100">
            <CardTitle className="flex items-center text-lg">
              <Phone className="mr-3 h-6 w-6 text-cashew-600" />
              Kontak Langsung
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Button 
                onClick={() => toast.success('Menghubungi: +62-800-1234-5678')}
                className="w-full bg-cashew-600 hover:bg-cashew-700 text-white py-3"
              >
                <Phone className="mr-2 h-4 w-4" />
                Telepon Support (24/7)
              </Button>
              
              <Button 
                onClick={() => toast.success('Membuka email: support@jambumete.com')}
                variant="outline"
                className="w-full border-cashew-300 hover:bg-cashew-50 py-3"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>

              <div className="text-center text-xs text-cashew-500 mt-4 p-3 bg-cashew-25 rounded-lg">
                <p>Tim support tersedia 24/7</p>
                <p>Waktu respon rata-rata: 1-4 jam</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Guides Section */}
      <Card className="shadow-lg border-cashew-200 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4 bg-gradient-to-r from-cashew-50 to-white border-b border-cashew-100">
          <CardTitle className="text-xl text-cashew-800">Panduan Cepat</CardTitle>
          <p className="text-sm text-cashew-600 mt-1">
            Panduan singkat untuk fitur-fitur utama aplikasi
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {quickGuides.map((guide, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-r ${guide.color} border border-cashew-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                onClick={() => toast.success(`Membuka panduan ${guide.title}...`)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${guide.iconBg} p-3 rounded-xl shadow-sm`}>
                    <guide.icon className={`h-6 w-6 ${guide.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">{guide.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Buka Panduan
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="shadow-lg border-cashew-200 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4 bg-gradient-to-r from-cashew-50 to-white border-b border-cashew-100">
          <CardTitle className="text-xl text-cashew-800 flex items-center">
            <MessageCircle className="h-5 w-5 mr-3 text-cashew-600" />
            Pertanyaan yang Sering Ditanyakan
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-cashew-200 rounded-xl px-6 py-2 bg-gradient-to-r from-white to-cashew-25 hover:shadow-md transition-all"
              >
                <AccordionTrigger className="text-left hover:text-cashew-700 py-4 hover:no-underline">
                  <span className="font-medium text-cashew-800 pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-cashew-600 pb-4 pt-2 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Form Section */}
      <Card className="shadow-lg border-cashew-200 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4 bg-gradient-to-r from-cashew-50 to-white border-b border-cashew-100">
          <CardTitle className="text-xl text-cashew-800 flex items-center">
            <Users className="h-5 w-5 mr-3 text-cashew-600" />
            Kirim Pesan Bantuan
          </CardTitle>
          <p className="text-sm text-cashew-600 mt-1">
            Butuh bantuan lebih lanjut? Kirimkan pesan Anda dan tim support akan merespons segera
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSendSupport} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-cashew-700">
                  Email Anda *
                </label>
                <Input 
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="border-cashew-200 focus:border-cashew-400 focus:ring-cashew-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-cashew-700">
                  Kategori
                </label>
                <select className="w-full px-3 py-2 border border-cashew-200 rounded-md focus:border-cashew-400 focus:outline-none focus:ring-1 focus:ring-cashew-400">
                  <option>Masalah Teknis</option>
                  <option>Bantuan Penggunaan</option>
                  <option>Saran & Masukan</option>
                  <option>Lainnya</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-cashew-700">
                Pesan *
              </label>
              <Textarea 
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Deskripsikan masalah atau pertanyaan Anda dengan detail..."
                className="min-h-[120px] border-cashew-200 focus:border-cashew-400 focus:ring-cashew-400"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-cashew-600 hover:bg-cashew-700 px-8 py-3 font-medium shadow-lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Kirim Pesan Bantuan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport;
