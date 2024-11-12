// script.js

$(document).ready(function () {
    // Display the current day at the top
    function displayCurrentDay() {
      $('#currentDay').text(moment().format('dddd, MMMM Do YYYY'));
    }
  
    // Load saved events from local storage
    function loadEvents() {
      return JSON.parse(localStorage.getItem('events')) || {};
    }
  
    // Save an event to local storage
    function saveEvent(hour, eventText) {
      const events = loadEvents();
      events[hour] = eventText;
      localStorage.setItem('events', JSON.stringify(events));
    }
  
    // Get color class based on the current hour
    function getTimeBlockColorClass(hour) {
      const currentHour = moment().hour();
      // Change the background color logic
      if (hour < currentHour) return 'past';      // Past hours - yellow
      if (hour === currentHour) return 'present';  // Current hour - red
      return 'future';                             // Future hours - green
    }
  
    // Generate time blocks dynamically
    function createTimeBlocks() {
      const timeBlocksContainer = $('#timeBlocks');
      const events = loadEvents();
      const businessHoursStart = 9; // Start at 9 AM
      const businessHoursEnd = 17; // End at 5 PM
  
      for (let hour = businessHoursStart; hour <= businessHoursEnd; hour++) {
        const colorClass = getTimeBlockColorClass(hour); // Get the color class based on time
        const hourText = moment({ hour }).format('h A');
        const eventText = events[hour] || '';
  
        // Create time block elements with dynamic color classes applied
        const timeBlock = $(`
          <div class="row time-block">
            <div class="col-2 hour">${hourText}</div>
            <textarea class="col-8 event form-control ${colorClass}">${eventText}</textarea>
            <button class="col-2 btn saveBtn"><i class="fas fa-save"></i></button>
          </div>
        `);
  
        // Save button click event
        timeBlock.find('.saveBtn').on('click', function () {
          const eventText = $(this).siblings('.event').val();
          saveEvent(hour, eventText);
        });
  
        // Append time block to container
        timeBlocksContainer.append(timeBlock);
      }
    }
  
    // Initialize the planner
    function initPlanner() {
      displayCurrentDay();
      createTimeBlocks();
    }
  
    initPlanner();
  });
  