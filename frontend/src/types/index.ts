export interface Equipment {
  _id: string;
  name: string;
  serial?: string;
  department?: string;
  maintTeam: { _id: string; name: string };
}

export interface MaintenanceRequest {
  _id: string;
  subject: string;
  equipment?: Equipment;
  team?: { _id: string; name: string };
  type: 'corrective' | 'preventive';
  stage: 'new' | 'progress' | 'repaired' | 'scrap';
  scheduledDate?: string;
  duration?: number;
  assignedTo?: { _id: string; name: string; avatar?: string };
}