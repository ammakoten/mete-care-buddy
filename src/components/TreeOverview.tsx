
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trees } from '@/data/mockData';
import { TreeDeciduous, CalendarCheck, MapPin, Info, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface TreeOverviewProps {
  viewMode?: 'grid' | 'list';
}

const TreeOverview = ({ viewMode = 'grid' }: TreeOverviewProps) => {
  const { toast } = useToast();

  const handleViewDetails = (treeId: string) => {
    toast({
      title: "Detail Pohon",
      description: `Melihat detail untuk pohon dengan ID: ${treeId}`,
    });
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Sehat</Badge>;
      case 'needs-attention':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Perlu Perhatian</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Kritis</Badge>;
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
                      <h3 className="font-semibold text-gray-800">{tree.name}</h3>
                      {getHealthBadge(tree.health)}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{tree.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Info className="h-4 w-4" />
                        <span>{tree.variety}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarCheck className="h-4 w-4" />
                        <span>{new Date(tree.lastMaintenance).toLocaleDateString('id-ID')}</span>
                      </div>
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
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
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
                <CardTitle className="text-base font-semibold text-gray-800">
                  {tree.name}
                </CardTitle>
              </div>
              {getHealthBadge(tree.health)}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{tree.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Info className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{tree.variety}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <CalendarCheck className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {new Date(tree.lastMaintenance).toLocaleDateString('id-ID')}
                  </span>
                </div>
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
                <Button variant="ghost" size="sm" className="px-2">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TreeOverview;
