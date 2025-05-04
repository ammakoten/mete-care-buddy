
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { maintenanceTasks, trees } from '@/data/mockData';
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const getTreeName = (treeId: string) => {
  const tree = trees.find(t => t.id === treeId);
  return tree ? tree.name : "Pohon Tidak Diketahui";
};

const getTaskIcon = (taskType: string) => {
  switch(taskType) {
    case 'pruning': return '✂️';
    case 'fertilizing': return '🧪';
    case 'pest-control': return '🐛';
    case 'watering': return '💧';
    case 'harvesting': return '🌾';
    default: return '📝';
  }
};

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
    case 'pending': return <AlertCircle className="h-4 w-4 text-amber-500" />;
    default: return null;
  }
};

const MaintenanceTasks = () => {
  const { toast } = useToast();

  const handleScheduleTask = () => {
    toast({
      title: "Jadwalkan Tugas",
      description: "Fitur untuk menjadwalkan tugas baru akan segera hadir!",
    });
  };

  const handleCompleteTask = (taskId: string) => {
    toast({
      title: "Tugas Selesai",
      description: "Tugas berhasil ditandai sebagai selesai!",
    });
  };

  const handleEditTask = (taskId: string) => {
    toast({
      title: "Edit Tugas",
      description: `Mengedit tugas dengan ID: ${taskId}`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cashew-800">Tugas Pemeliharaan</h2>
        <Button className="bg-cashew-600 hover:bg-cashew-700" onClick={handleScheduleTask}>
          Jadwalkan Tugas
        </Button>
      </div>
      
      <div className="space-y-4">
        {maintenanceTasks.map((task) => (
          <Card key={task.id} className="animate-fade-in border-cashew-100 hover:border-cashew-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getTaskIcon(task.taskType)}</div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      {task.title}
                      {getStatusIcon(task.status)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{getTreeName(task.treeId)}</p>
                    <p className="text-sm mt-2">{task.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <Badge 
                    className={
                      task.priority === "low" 
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                        : task.priority === "medium"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                    }
                  >
                    {task.priority === "low" ? "Prioritas rendah" : task.priority === "medium" ? "Prioritas sedang" : "Prioritas tinggi"}
                  </Badge>
                  
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">Tenggat: {new Date(task.dueDate).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                {task.status !== 'completed' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-green-200 hover:bg-green-50 text-green-700"
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    Tandai Selesai
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-cashew-200 hover:bg-cashew-50 text-cashew-700"
                  onClick={() => handleEditTask(task.id)}
                >
                  Edit Tugas
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTasks;
