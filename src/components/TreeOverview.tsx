
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trees } from '@/data/mockData';
import { TreeDeciduous, CalendarCheck, MapPin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const TreeOverview = () => {
  const { toast } = useToast();

  const handleAddTree = () => {
    toast({
      title: "Tambah Pohon",
      description: "Fitur untuk menambahkan pohon baru akan segera hadir!",
    });
  };

  const handleViewDetails = (treeId: string) => {
    toast({
      title: "Detail Pohon",
      description: `Melihat detail untuk pohon dengan ID: ${treeId}`,
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cashew-800">Inventaris Pohon</h2>
        <Button className="bg-cashew-600 hover:bg-cashew-700" onClick={handleAddTree}>
          Tambah Pohon Baru
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trees.map((tree) => (
          <Card key={tree.id} className="tree-card border-cashew-100 hover:border-cashew-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center">
                  <TreeDeciduous className="h-5 w-5 mr-2 text-cashew-600" />
                  {tree.name}
                </CardTitle>
                <Badge 
                  className={
                    tree.health === "healthy" 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : tree.health === "needs-attention"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {tree.health === "healthy" ? "Sehat" : tree.health === "needs-attention" ? "Perlu Perhatian" : "Kritis"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Pemeliharaan terakhir: </span>
                  <span>{new Date(tree.lastMaintenance).toLocaleDateString('id-ID')}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Lokasi: </span>
                  <span>{tree.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Varietas: </span>
                  <span>{tree.variety}</span>
                </div>
                
                {tree.notes && (
                  <div className="mt-3 text-sm border-t pt-2 border-dashed border-cashew-200">
                    <p className="text-muted-foreground">{tree.notes}</p>
                  </div>
                )}
                
                <div className="pt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-cashew-200 hover:bg-cashew-50 text-cashew-700"
                    onClick={() => handleViewDetails(tree.id)}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TreeOverview;
