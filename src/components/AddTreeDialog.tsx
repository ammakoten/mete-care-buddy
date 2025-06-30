
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useTreeContext } from '@/contexts/TreeContext';
import { toast } from 'sonner';

const AddTreeDialog = () => {
  const { addTree } = useTreeContext();
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

    addTree({
      name: formData.name,
      age: parseInt(formData.age),
      health: formData.health,
      variety: formData.variety,
      location: formData.location,
      notes: formData.notes,
      lastMaintenance: new Date().toISOString().split('T')[0]
    });

    toast.success('Pohon berhasil ditambahkan!');
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
                placeholder="Contoh: Cashew Tree A1"
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
                  <SelectItem value="Common Cashew">Common Cashew</SelectItem>
                  <SelectItem value="Dwarf Cashew">Dwarf Cashew</SelectItem>
                  <SelectItem value="Jumbo Cashew">Jumbo Cashew</SelectItem>
                  <SelectItem value="Brazilian Cashew">Brazilian Cashew</SelectItem>
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
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Contoh: North Field - Section 1"
            />
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
