import React, { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRequests } from '../hooks/useRequests';
import { MaintenanceRequest } from '../types';
import RequestCard from './RequestCard';

const stages = ['new', 'progress', 'repaired', 'scrap'] as const;

const KanbanBoard: React.FC = () => {
  const { requests, updateStage, loading } = useRequests();

  const onDragEnd = useCallback((result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      updateStage(result.draggableId, destination.droppableId as MaintenanceRequest['stage']);
    }
  }, [updateStage]);

  if (loading) return <div className="loading">Loading GearGuard...</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {stages.map(stage => {
          const stageRequests = requests.filter(r => r.stage === stage);
          return (
            <Droppable droppableId={stage} key={stage}>
              {(provided, snapshot) => (
                <div 
                  className={stage ${stage} ${snapshot.isDraggingOver ? 'drag-over' : ''}}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{stage.toUpperCase()} ({stageRequests.length})</h2>
                  {stageRequests.map((request, index) => (
                    <Draggable key={request._id} draggableId={request._id} index={index}>
                      {(provided, snapshot) => (
                        <RequestCard 
                          request={request}
                          provided={provided}
                          snapshot={snapshot}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;