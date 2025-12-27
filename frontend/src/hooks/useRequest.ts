import { useState, useEffect } from 'react';
import axios from 'axios';
import { MaintenanceRequest } from '../types';

export const useRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/requests');
      setRequests(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const updateStage = async (id: string, stage: MaintenanceRequest['stage']) => {
    try {
      const { data } = await axios.patch(/requests/${id}/stage, { stage });
      setRequests(requests.map(r => r._id === id ? data : r));
    } catch (err) {
      console.error(err);
    }
  };

  const createRequest = async (request: Omit<MaintenanceRequest, '_id'>) => {
    try {
      const { data } = await axios.post('/requests', request);
      setRequests([data, ...requests]);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const getEquipmentTeam = async (equipId: string) => {
    const { data } = await axios.get(/requests/equipment/${equipId}/team);
    return data.team;
  };

  return { requests, loading, updateStage, createRequest, getEquipmentTeam };
};