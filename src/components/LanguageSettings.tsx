
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Languages } from 'lucide-react';
import { toast } from 'sonner';

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('id');

  const languages = [
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    const selectedLang = languages.find(lang => lang.code === languageCode);
    toast.success(`Bahasa berhasil diubah ke ${selectedLang?.name}`);
  };

  return (
    <Card id="language" className="shadow-sm border-cashew-200">
      <CardHeader className="pb-3 border-b border-cashew-100">
        <CardTitle className="flex items-center">
          <Languages className="mr-2 h-5 w-5 text-cashew-600" />
          Pengaturan Bahasa
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-cashew-700 mb-2 block">
              Pilih Bahasa Interface
            </label>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full border-cashew-200">
                <SelectValue placeholder="Pilih bahasa" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-cashew-50 p-4 rounded-lg">
            <h4 className="font-medium text-cashew-800 mb-2">Informasi Bahasa</h4>
            <p className="text-sm text-cashew-600">
              Mengubah bahasa akan mempengaruhi seluruh interface aplikasi. 
              Beberapa istilah teknis mungkin tetap dalam bahasa asli untuk konsistensi.
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => toast.success('Pengaturan bahasa disimpan')}
          className="bg-cashew-600 hover:bg-cashew-700"
        >
          Simpan Pengaturan Bahasa
        </Button>
      </CardContent>
    </Card>
  );
};

export default LanguageSettings;
