
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreeDeciduous, CalendarCheck, MapPin, Info, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTreeContext } from '@/contexts/TreeContext';

interface TreeOverviewProps {
  viewMode?: 'grid' | 'list';
}

const TreeOverview = ({ viewMode = 'grid' }: TreeOverviewProps) => {
  const { toast: toastUI } = useToast();
  const navigate = useNavigate();
  const { trees, deleteTree } = useTreeContext();

  const handleViewDetails = (treeId: string) => {
    navigate('/analytics');
    toast.success(`Menampilkan detail pohon dengan ID: ${treeId}`);
  };

  const handleEditTree = (treeId: string, treeName: string) => {
    navigate('/settings');
    toast.success(`Mengedit pohon: ${treeName}`);
  };

  const handleDeleteTree = (treeId: string, treeName: string) => {
    deleteTree(treeId);
    toast.success(`Pohon ${treeName} berhasil dihapus`);
  };

  const handleLocationClick = (location: string) => {
    navigate('/weather');
    toast.success(`Menampilkan cuaca untuk lokasi: ${location}`);
  };

  const handleMaintenanceClick = (treeId: string) => {
    navigate('/tasks');
    toast.success("Menampilkan tugas pemeliharaan untuk pohon ini");
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer">Sehat</Badge>;
      case 'needs-attention':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer">Perlu Perhatian</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer">Kritis</Badge>;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {trees.map((tree) => (
          <Card key={tree.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-cashew-100 rounded-lg">
                    <TreeDeciduous className="h-6 w-6 text-cashew-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-gray-800 hover:text-cashew-600 cursor-pointer" onClick={() => handleViewDetails(tree.id)}>
                        {tree.name}
                      </h3>
                      {getHealthBadge(tree.health)}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <button 
                        className="flex items-center space-x-1 hover:text-cashew-600 transition-colors"
                        onClick={() => handleLocationClick(tree.location)}
                      >
                        <MapPin className="h-4 w-4" />
                        <span>{tree.location}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <Info className="h-4 w-4" />
                        <span>{tree.variety}</span>
                      </div>
                      <button 
                        className="flex items-center space-x-1 hover:text-cashew-600 transition-colors"
                        onClick={() => handleMaintenanceClick(tree.id)}
                      >
                        <CalendarCheck className="h-4 w-4" />
                        <span>{new Date(tree.lastMaintenance).toLocaleDateString('id-ID')}</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(tree.id)}
                    className="border-cashew-200 hover:bg-cashew-50 text-cashew-700"
                  >
                    Lihat Detail
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditTree(tree.id, tree.name)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Pohon
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteTree(tree.id, tree.name)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus Pohon
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {trees.map((tree) => (
        <Card key={tree.id} className="border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-cashew-100 rounded-lg">
                  <TreeDeciduous className="h-5 w-5 text-cashew-600" />
                </div>
                <CardTitle 
                  className="text-base font-semibold text-gray-800 hover:text-cashew-600 cursor-pointer transition-colors"
                  onClick={() => handleViewDetails(tree.id)}
                >
                  {tree.name}
                </CardTitle>
              </div>
              {getHealthBadge(tree.health)}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="space-y-2">
                <button 
                  className="flex items-center space-x-2 text-sm hover:text-cashew-600 transition-colors w-full text-left"
                  onClick={() => handleLocationClick(tree.location)}
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{tree.location}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Info className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{tree.variety}</span>
                </div>
                
                <button 
                  className="flex items-center space-x-2 text-sm hover:text-cashew-600 transition-colors w-full text-left"
                  onClick={() => handleMaintenanceClick(tree.id)}
                >
                  <CalendarCheck className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {new Date(tree.lastMaintenance).toLocaleDateString('id-ID')}
                  </span>
                </button>
              </div>
              
              {tree.notes && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 line-clamp-2">{tree.notes}</p>
                </div>
              )}
              
              <div className="pt-3 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-cashew-200 hover:bg-cashew-50 text-cashew-700 text-xs"
                  onClick={() => handleViewDetails(tree.id)}
                >
                  Lihat Detail
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="px-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEditTree(tree.id, tree.name)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteTree(tree.id, tree.name)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TreeOverview;
