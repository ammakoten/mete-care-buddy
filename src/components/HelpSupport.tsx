
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileText,
  Video,
  Download,
  MessageSquare,
  BookOpen,
  HeadphonesIcon
} from 'lucide-react';
import { toast } from 'sonner';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
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
    },
    {
      question: "Bagaimana cara backup data?",
      answer: "Data Anda secara otomatis dibackup setiap hari. Anda juga dapat melakukan backup manual dengan mengunduh data melalui halaman 'Sumber Daya'."
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cashew-800 mb-2 flex items-center">
          <HelpCircle className="h-8 w-8 mr-3 text-cashew-600" />
          Pusat Bantuan
        </h1>
        <p className="text-cashew-600">
          Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Navigation */}
        <div className="border-b border-cashew-200">
          <TabsList className="grid w-full grid-cols-4 bg-cashew-50/50 border border-cashew-200 rounded-lg p-1">
            <TabsTrigger 
              value="faq" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-cashew-800 data-[state=active]:shadow-sm"
            >
              <MessageSquare className="h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger 
              value="guides"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-cashew-800 data-[state=active]:shadow-sm"
            >
              <BookOpen className="h-4 w-4" />
              Panduan
            </TabsTrigger>
            <TabsTrigger 
              value="resources"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-cashew-800 data-[state=active]:shadow-sm"
            >
              <Book className="h-4 w-4" />
              Sumber Daya
            </TabsTrigger>
            <TabsTrigger 
              value="contact"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-cashew-800 data-[state=active]:shadow-sm"
            >
              <HeadphonesIcon className="h-4 w-4" />
              Kontak
            </TabsTrigger>
          </TabsList>
        </div>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4">
          <Card className="shadow-md border-cashew-200 bg-white/95 backdrop-blur-sm">
            <CardHeader className="border-b border-cashew-100 bg-gradient-to-r from-cashew-50 to-white">
              <CardTitle className="text-xl text-cashew-800 flex items-center">
                <MessageCircle className="h-5 w-5 mr-3 text-cashew-600" />
                Pertanyaan yang Sering Ditanyakan
              </CardTitle>
              <p className="text-sm text-cashew-600 mt-1">
                Temukan jawaban untuk pertanyaan umum tentang aplikasi
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqData.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border border-cashew-200 rounded-lg px-5 py-2 bg-gradient-to-r from-white to-cashew-25 hover:shadow-sm transition-all"
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
        </TabsContent>

        {/* Quick Guides Tab */}
        <TabsContent value="guides" className="space-y-4">
          <Card className="shadow-md border-cashew-200 bg-white/95 backdrop-blur-sm">
            <CardHeader className="border-b border-cashew-100 bg-gradient-to-r from-cashew-50 to-white">
              <CardTitle className="text-xl text-cashew-800 flex items-center">
                <BookOpen className="h-5 w-5 mr-3 text-cashew-600" />
                Panduan Cepat
              </CardTitle>
              <p className="text-sm text-cashew-600 mt-1">
                Panduan singkat untuk fitur-fitur utama aplikasi
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {quickGuides.map((guide, index) => (
                  <div 
                    key={index} 
                    className={`bg-gradient-to-r ${guide.color} border border-cashew-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 cursor-pointer`}
                    onClick={() => toast.success(`Membuka panduan ${guide.title}...`)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${guide.iconBg} p-3 rounded-lg shadow-sm`}>
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
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card className="shadow-md border-cashew-200 bg-white/95 backdrop-blur-sm">
            <CardHeader className="border-b border-cashew-100 bg-gradient-to-r from-cashew-50 to-white">
              <CardTitle className="text-xl text-cashew-800 flex items-center">
                <Book className="h-5 w-5 mr-3 text-cashew-600" />
                Sumber Daya
              </CardTitle>
              <p className="text-sm text-cashew-600 mt-1">
                Unduh panduan, template, dan materi pembelajaran
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {resourceLinks.map((resource, index) => (
                  <Button 
                    key={index}
                    onClick={() => toast.success(`Mengunduh ${resource.title}...`)}
                    variant="outline" 
                    className="w-full flex items-center justify-between p-6 h-auto border-cashew-200 hover:bg-cashew-50 hover:border-cashew-300 transition-all"
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
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          {/* Quick Contact */}
          <Card className="shadow-md border-cashew-200 bg-white/95 backdrop-blur-sm">
            <CardHeader className="border-b border-cashew-100 bg-gradient-to-r from-cashew-50 to-white">
              <CardTitle className="text-xl text-cashew-800 flex items-center">
                <Phone className="h-5 w-5 mr-3 text-cashew-600" />
                Kontak Cepat
              </CardTitle>
              <p className="text-sm text-cashew-600 mt-1">
                Hubungi tim support kami untuk bantuan langsung
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => toast.success('Menghubungi: +62-800-1234-5678')}
                  className="w-full bg-cashew-600 hover:bg-cashew-700 text-white py-4"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Telepon Support (24/7)
                </Button>
                
                <Button 
                  onClick={() => toast.success('Membuka email: support@jambumete.com')}
                  variant="outline"
                  className="w-full border-cashew-300 hover:bg-cashew-50 py-4"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
              </div>

              <div className="text-center text-sm text-cashew-600 mt-4 p-4 bg-cashew-25 rounded-lg">
                <p className="font-medium">Tim support tersedia 24/7</p>
                <p>Waktu respon rata-rata: 1-4 jam</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="shadow-md border-cashew-200 bg-white/95 backdrop-blur-sm">
            <CardHeader className="border-b border-cashew-100 bg-gradient-to-r from-cashew-50 to-white">
              <CardTitle className="text-xl text-cashew-800 flex items-center">
                <MessageCircle className="h-5 w-5 mr-3 text-cashew-600" />
                Kirim Pesan Bantuan
              </CardTitle>
              <p className="text-sm text-cashew-600 mt-1">
                Kirimkan pesan detail dan tim support akan merespons segera
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
                    className="bg-cashew-600 hover:bg-cashew-700 px-8 py-3 font-medium shadow-md"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Kirim Pesan Bantuan
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpSupport;
