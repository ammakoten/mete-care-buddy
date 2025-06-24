
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, MessageCircle, Book, Phone, Mail, ExternalLink } from 'lucide-react';
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
    toast.info('Membuka panduan pengguna...');
  };

  const handleOpenFAQ = () => {
    toast.info('Membuka halaman FAQ...');
  };

  const handleCallSupport = () => {
    toast.info('Menghubungi: +62-800-1234-5678');
  };

  const handleEmailSupport = () => {
    toast.info('Membuka email: support@jambumete.com');
  };

  return (
    <Card id="help" className="shadow-sm border-cashew-200">
      <CardHeader className="pb-3 border-b border-cashew-100">
        <CardTitle className="flex items-center">
          <HelpCircle className="mr-2 h-5 w-5 text-cashew-600" />
          Bantuan & Dukungan
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Quick Help Options */}
        <div className="grid gap-4 md:grid-cols-2">
          <Button 
            onClick={handleOpenGuide}
            variant="outline" 
            className="flex items-center justify-start p-4 h-auto border-cashew-200 hover:bg-cashew-50"
          >
            <Book className="mr-3 h-5 w-5 text-cashew-600" />
            <div className="text-left">
              <div className="font-medium">Panduan Pengguna</div>
              <div className="text-sm text-cashew-500">Tutorial lengkap penggunaan aplikasi</div>
            </div>
            <ExternalLink className="ml-auto h-4 w-4" />
          </Button>
          
          <Button 
            onClick={handleOpenFAQ}
            variant="outline" 
            className="flex items-center justify-start p-4 h-auto border-cashew-200 hover:bg-cashew-50"
          >
            <MessageCircle className="mr-3 h-5 w-5 text-cashew-600" />
            <div className="text-left">
              <div className="font-medium">FAQ</div>
              <div className="text-sm text-cashew-500">Pertanyaan yang sering ditanyakan</div>
            </div>
            <ExternalLink className="ml-auto h-4 w-4" />
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Contact Support */}
        <div className="space-y-4">
          <h4 className="font-medium text-cashew-800">Hubungi Tim Dukungan</h4>
          
          <div className="grid gap-3 md:grid-cols-2">
            <Button 
              onClick={handleCallSupport}
              variant="outline" 
              className="flex items-center justify-center border-cashew-200 hover:bg-cashew-50"
            >
              <Phone className="mr-2 h-4 w-4" />
              Telepon Support
            </Button>
            
            <Button 
              onClick={handleEmailSupport}
              variant="outline" 
              className="flex items-center justify-center border-cashew-200 hover:bg-cashew-50"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Support Form */}
        <form onSubmit={handleSendSupport} className="space-y-4">
          <h4 className="font-medium text-cashew-800">Kirim Pesan Bantuan</h4>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-cashew-700 mb-1 block">
                Email Anda
              </label>
              <Input 
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="email@example.com"
                className="border-cashew-200"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-cashew-700 mb-1 block">
                Pesan
              </label>
              <Textarea 
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Deskripsikan masalah atau pertanyaan Anda..."
                className="min-h-[100px] border-cashew-200"
              />
            </div>
          </div>
          
          <Button 
            type="submit"
            className="bg-cashew-600 hover:bg-cashew-700 w-full"
          >
            Kirim Pesan Bantuan
          </Button>
        </form>

        {/* Support Info */}
        <div className="bg-cashew-50 p-4 rounded-lg">
          <h4 className="font-medium text-cashew-800 mb-2">Informasi Dukungan</h4>
          <div className="text-sm text-cashew-600 space-y-1">
            <p>📞 Telepon: +62-800-1234-5678 (24/7)</p>
            <p>📧 Email: support@jambumete.com</p>
            <p>🕒 Waktu Respons: 1-24 jam</p>
            <p>🌐 Website: www.jambumete.com/help</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpSupport;
