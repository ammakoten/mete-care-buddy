import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useTreeContext } from '@/contexts/TreeContext';
import { useTaskContext } from '@/contexts/TaskContext';
import { toast } from 'sonner';

const AddTreeDialog = () => {
  const { addTree } = useTreeContext();
  const { generateTasksForTree } = useTaskContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    health: 'healthy' as const,
    variety: '',
    location: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.variety || !formData.location) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    const treeId = Date.now().toString();
    
    // Add tree first
    addTree({
      name: formData.name,
      age: parseInt(formData.age),
      health: formData.health,
      variety: formData.variety,
      location: formData.location,
      notes: formData.notes,
      lastMaintenance: new Date().toISOString().split('T')[0]
    }, false);

    // Generate tasks for the new tree
    setTimeout(() => {
      generateTasksForTree(treeId);
      toast.success('Pohon berhasil ditambahkan dengan jadwal pemeliharaan otomatis!', {
        description: 'Tugas pemeliharaan telah dijadwalkan secara otomatis'
      });
    }, 100);

    setOpen(false);
    setFormData({
      name: '',
      age: '',
      health: 'healthy',
      variety: '',
      location: '',
      notes: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cashew-600 hover:bg-cashew-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Pohon
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Pohon Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Pohon *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Contoh: Pohon Jambu Mete A1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Umur (tahun) *</Label>
              <Input
                id="age"
                type="number"
                min="0"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Contoh: 5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="variety">Varietas *</Label>
              <Select value={formData.variety} onValueChange={(value) => handleInputChange('variety', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih varietas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jambu Mete Biasa">Jambu Mete Biasa</SelectItem>
                  <SelectItem value="Jambu Mete Kerdil">Jambu Mete Kerdil</SelectItem>
                  <SelectItem value="Jambu Mete Jumbo">Jambu Mete Jumbo</SelectItem>
                  <SelectItem value="Jambu Mete Gajah">Jambu Mete Gajah</SelectItem>
                  <SelectItem value="Jambu Mete Merah">Jambu Mete Merah</SelectItem>
                  <SelectItem value="Jambu Mete Brazil">Jambu Mete Brazil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="health">Status Kesehatan</Label>
              <Select value={formData.health} onValueChange={(value: any) => handleInputChange('health', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy">Sehat</SelectItem>
                  <SelectItem value="needs-attention">Perlu Perhatian</SelectItem>
                  <SelectItem value="critical">Kritis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lokasi *</Label>
            <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kebun Utara - Bagian 1">Kebun Utara - Bagian 1</SelectItem>
                <SelectItem value="Kebun Utara - Bagian 2">Kebun Utara - Bagian 2</SelectItem>
                <SelectItem value="Kebun Selatan - Bagian 1">Kebun Selatan - Bagian 1</SelectItem>
                <SelectItem value="Kebun Selatan - Bagian 2">Kebun Selatan - Bagian 2</SelectItem>
                <SelectItem value="Kebun Timur - Bagian 1">Kebun Timur - Bagian 1</SelectItem>
                <SelectItem value="Kebun Timur - Bagian 2">Kebun Timur - Bagian 2</SelectItem>
                <SelectItem value="Kebun Barat - Bagian 1">Kebun Barat - Bagian 1</SelectItem>
                <SelectItem value="Kebun Barat - Bagian 2">Kebun Barat - Bagian 2</SelectItem>
                <SelectItem value="Kebun Tengah">Kebun Tengah</SelectItem>
                <SelectItem value="Area Pembibitan">Area Pembibitan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Catatan tambahan tentang pohon..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-cashew-600 hover:bg-cashew-700">
              Tambah Pohon
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTreeDialog;
