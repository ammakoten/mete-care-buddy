
export interface TreeData {
  id: string;
  name: string;
  age: number;
  health: 'healthy' | 'needs-attention' | 'critical';
  lastMaintenance: string;
  variety: string;
  location: string;
  notes?: string;
}

export interface MaintenanceTask {
  id: string;
  treeId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  taskType: 'pruning' | 'fertilizing' | 'pest-control' | 'watering' | 'harvesting';
}

export interface WeatherData {
  date: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  humidity: number;
  rainfall: number;
}

export const trees: TreeData[] = [
  {
    id: "1",
    name: "Cashew Tree A1",
    age: 5,
    health: "healthy",
    lastMaintenance: "2025-04-20",
    variety: "Common Cashew",
    location: "North Field - Section 1",
    notes: "Produced good yield last season"
  },
  {
    id: "2",
    name: "Cashew Tree A2",
    age: 3,
    health: "needs-attention",
    lastMaintenance: "2025-04-15",
    variety: "Dwarf Cashew",
    location: "North Field - Section 1",
    notes: "Showing signs of leaf spot"
  },
  {
    id: "3",
    name: "Cashew Tree B1",
    age: 7,
    health: "healthy",
    lastMaintenance: "2025-04-22",
    variety: "Common Cashew",
    location: "East Field - Section 2",
    notes: "Recently pruned"
  },
  {
    id: "4",
    name: "Cashew Tree B2",
    age: 6,
    health: "critical",
    lastMaintenance: "2025-03-10",
    variety: "Jumbo Cashew",
    location: "East Field - Section 2",
    notes: "Severe pest infestation, requires immediate treatment"
  },
  {
    id: "5",
    name: "Cashew Tree C1",
    age: 4,
    health: "healthy",
    lastMaintenance: "2025-04-18",
    variety: "Common Cashew",
    location: "South Field - Section 3",
    notes: "Growing well after last fertilizer application"
  },
];

export const maintenanceTasks: MaintenanceTask[] = [
  {
    id: "t1",
    treeId: "2",
    title: "Apply fungicide",
    description: "Apply organic fungicide to treat leaf spot",
    dueDate: "2025-05-10",
    status: "pending",
    priority: "medium",
    taskType: "pest-control"
  },
  {
    id: "t2",
    treeId: "4",
    title: "Pest treatment",
    description: "Apply insecticide for severe pest infestation",
    dueDate: "2025-05-07",
    status: "in-progress",
    priority: "high",
    taskType: "pest-control"
  },
  {
    id: "t3",
    treeId: "1",
    title: "Prune branches",
    description: "Routine pruning to maintain shape and air circulation",
    dueDate: "2025-05-15",
    status: "pending",
    priority: "low",
    taskType: "pruning"
  },
  {
    id: "t4",
    treeId: "3",
    title: "Apply fertilizer",
    description: "Apply seasonal NPK fertilizer",
    dueDate: "2025-05-12",
    status: "pending",
    priority: "medium",
    taskType: "fertilizing"
  },
  {
    id: "t5",
    treeId: "5",
    title: "Check irrigation system",
    description: "Ensure drip irrigation is working properly",
    dueDate: "2025-05-08",
    status: "completed",
    priority: "medium",
    taskType: "watering"
  },
];

export const weatherForecast: WeatherData[] = [
  {
    date: "2025-05-05",
    temperature: 28,
    condition: "sunny",
    humidity: 65,
    rainfall: 0
  },
  {
    date: "2025-05-06",
    temperature: 29,
    condition: "sunny",
    humidity: 60,
    rainfall: 0
  },
  {
    date: "2025-05-07",
    temperature: 27,
    condition: "cloudy",
    humidity: 70,
    rainfall: 0
  },
  {
    date: "2025-05-08",
    temperature: 26,
    condition: "rainy",
    humidity: 80,
    rainfall: 15
  },
  {
    date: "2025-05-09",
    temperature: 25,
    condition: "rainy",
    humidity: 85,
    rainfall: 20
  }
];
