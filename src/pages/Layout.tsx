import { Box, Flex, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import AlertDialogIndex from '../components/alertDialog/index.tsx';
import CalendarView from '../components/calendarView/index.tsx';
import EventSave from '../components/eventsSave/index.tsx';
import EventSearch from '../components/eventsSearch/index.tsx';
import NotificationIndex from '../components/notification/index.tsx';
import { useCalendarView } from '../hooks/useCalendarView.ts';
import { useEventForm } from '../hooks/useEventForm.ts';
import { useEventOperations } from '../hooks/useEventOperations.ts';
import { useNotifications } from '../hooks/useNotifications.ts';
import { useSearch } from '../hooks/useSearch.ts';
import { Event } from '../types.ts';

function Layout() {
  const {
    title,
    setTitle,
    date,
    setDate,
    startTime,
    endTime,
    description,
    setDescription,
    location,
    setLocation,
    category,
    setCategory,
    isRepeating,
    setIsRepeating,
    repeatType,
    setRepeatType,
    repeatInterval,
    setRepeatInterval,
    repeatEndDate,
    setRepeatEndDate,
    notificationTime,
    setNotificationTime,
    startTimeError,
    endTimeError,
    editingEvent,
    setEditingEvent,
    handleStartTimeChange,
    handleEndTimeChange,
    resetForm,
    editEvent,
  } = useEventForm();

  const { events, saveEvent, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  const { notifications, notifiedEvents, setNotifications } = useNotifications(events);
  const { view, setView, currentDate, holidays, navigate } = useCalendarView();
  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);

  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventSave
          editingEvent={editingEvent}
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
          category={category}
          setCategory={setCategory}
          isRepeating={isRepeating}
          setIsRepeating={setIsRepeating}
          notificationTime={notificationTime}
          setNotificationTime={setNotificationTime}
          startTimeError={startTimeError}
          startTime={startTime}
          handleStartTimeChange={handleStartTimeChange}
          endTimeError={endTimeError}
          endTime={endTime}
          handleEndTimeChange={handleEndTimeChange}
          repeatType={repeatType}
          setRepeatType={setRepeatType}
          repeatInterval={repeatInterval}
          setRepeatInterval={setRepeatInterval}
          repeatEndDate={repeatEndDate}
          setRepeatEndDate={setRepeatEndDate}
        />
        <CalendarView
          events={events}
          navigate={navigate}
          view={view}
          setView={setView}
          currentDate={currentDate}
          notifiedEvents={notifiedEvents}
          filteredEvents={filteredEvents}
          holidays={holidays}
        />
        <EventSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
        />
      </Flex>

      <AlertDialogIndex
        isOverlapDialogOpen={isOverlapDialogOpen}
        setIsOverlapDialogOpen={setIsOverlapDialogOpen}
        cancelRef={cancelRef}
        overlappingEvents={overlappingEvents}
      />

      {notifications.length > 0 && (
        <NotificationIndex notifications={notifications} setNotifications={setNotifications} />
      )}
    </Box>
  );
}

export default Layout;
