export const getAllEvents = async () => {
  try {
    const response = await fetch(
      "https://nextjs-course-e0db5-default-rtdb.firebaseio.com/events.json"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const events = [];
    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    return events;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getFeaturedEvents = async () => {
  try {
    const events = await getAllEvents();
    return events.filter((event) => event.isFeatured);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getEventById = async (id) => {
  try {
    const event = await getAllEvents();
    return event.find((event) => event.id === id);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  try {
    const events = await getAllEvents();
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });
    return filteredEvents;
  } catch (error) {
    console.error("Error:", error);
  }
};
