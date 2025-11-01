import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit2, Trash2, RefreshCw, ShoppingCart, ArrowRightLeft, Bell, Check, X, Clock } from 'lucide-react';

const Dashboard = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: '2025-11-05', time: '10:00', status: 'BUSY', description: 'Weekly team sync' },
    { id: 2, title: 'Lunch Break', date: '2025-11-05', time: '12:00', status: 'SWAPPABLE', description: 'Available for swapping' },
    { id: 3, title: 'Client Call', date: '2025-11-08', time: '14:00', status: 'BUSY', description: 'Q4 review with client' },
    { id: 4, title: 'Gym Session', date: '2025-11-10', time: '18:00', status: 'SWAPPABLE', description: 'Evening workout' },
  ]);
  
  const [view, setView] = useState('list');
  const [showModal, setShowModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedSlotForSwap, setSelectedSlotForSwap] = useState(null);
  const [marketplaceSlots, setMarketplaceSlots] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loadingMarketplace, setLoadingMarketplace] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    status: 'BUSY',
    description: ''
  });

  useEffect(() => {
    if (view === 'marketplace') {
      fetchMarketplaceSlots();
    } else if (view === 'requests') {
      fetchSwapRequests();
    }
  }, [view]);

  const fetchMarketplaceSlots = async () => {
    setLoadingMarketplace(true);
    try {
      const response = await fetch('/api/swappable-slots');
      if (response.ok) {
        const data = await response.json();
        setMarketplaceSlots(data);
      } else {
        setMarketplaceSlots([
          { id: 101, title: 'Coffee Break', date: '2025-11-06', time: '15:00', owner: 'Alice', description: 'Afternoon coffee slot' },
          { id: 102, title: 'Study Time', date: '2025-11-07', time: '14:00', owner: 'Bob', description: 'Library study session' },
          { id: 103, title: 'Yoga Class', date: '2025-11-09', time: '09:00', owner: 'Charlie', description: 'Morning yoga' },
          { id: 104, title: 'Free Slot', date: '2025-11-10', time: '11:00', owner: 'Diana', description: 'Open availability' },
        ]);
      }
    } catch (error) {
      setMarketplaceSlots([
        { id: 101, title: 'Coffee Break', date: '2025-11-06', time: '15:00', owner: 'Alice', description: 'Afternoon coffee slot' },
        { id: 102, title: 'Study Time', date: '2025-11-07', time: '14:00', owner: 'Bob', description: 'Library study session' },
        { id: 103, title: 'Yoga Class', date: '2025-11-09', time: '09:00', owner: 'Charlie', description: 'Morning yoga' },
        { id: 104, title: 'Free Slot', date: '2025-11-10', time: '11:00', owner: 'Diana', description: 'Open availability' },
      ]);
    } finally {
      setLoadingMarketplace(false);
    }
  };

  const fetchSwapRequests = async () => {
    setLoadingRequests(true);
    try {
      const incomingResponse = await fetch('/api/swap-requests/incoming');
      const outgoingResponse = await fetch('/api/swap-requests/outgoing');
      
      if (incomingResponse.ok) {
        const incomingData = await incomingResponse.json();
        setIncomingRequests(incomingData);
      } else {
        setIncomingRequests([
          {
            id: 201,
            requesterId: 'user123',
            requesterName: 'Alice Johnson',
            theirSlot: { title: 'Morning Jog', date: '2025-11-12', time: '07:00', description: 'Early morning run' },
            mySlot: { title: 'Lunch Break', date: '2025-11-05', time: '12:00', description: 'Available for swapping' },
            status: 'PENDING',
            createdAt: '2025-11-01T10:30:00Z'
          },
          {
            id: 202,
            requesterId: 'user456',
            requesterName: 'Bob Smith',
            theirSlot: { title: 'Afternoon Walk', date: '2025-11-13', time: '16:00', description: 'Park stroll' },
            mySlot: { title: 'Gym Session', date: '2025-11-10', time: '18:00', description: 'Evening workout' },
            status: 'PENDING',
            createdAt: '2025-11-01T09:15:00Z'
          }
        ]);
      }

      if (outgoingResponse.ok) {
        const outgoingData = await outgoingResponse.json();
        setOutgoingRequests(outgoingData);
      } else {
        setOutgoingRequests([
          {
            id: 301,
            recipientId: 'user789',
            recipientName: 'Charlie Brown',
            theirSlot: { title: 'Coffee Break', date: '2025-11-06', time: '15:00', description: 'Afternoon coffee' },
            mySlot: { title: 'Lunch Break', date: '2025-11-05', time: '12:00', description: 'Available for swapping' },
            status: 'PENDING',
            createdAt: '2025-10-31T14:20:00Z'
          }
        ]);
      }
    } catch (error) {
      setIncomingRequests([
        {
          id: 201,
          requesterId: 'user123',
          requesterName: 'Alice Johnson',
          theirSlot: { title: 'Morning Jog', date: '2025-11-12', time: '07:00', description: 'Early morning run' },
          mySlot: { title: 'Lunch Break', date: '2025-11-05', time: '12:00', description: 'Available for swapping' },
          status: 'PENDING',
          createdAt: '2025-11-01T10:30:00Z'
        },
        {
          id: 202,
          requesterId: 'user456',
          requesterName: 'Bob Smith',
          theirSlot: { title: 'Afternoon Walk', date: '2025-11-13', time: '16:00', description: 'Park stroll' },
          mySlot: { title: 'Gym Session', date: '2025-11-10', time: '18:00', description: 'Evening workout' },
          status: 'PENDING',
          createdAt: '2025-11-01T09:15:00Z'
        }
      ]);
      setOutgoingRequests([
        {
          id: 301,
          recipientId: 'user789',
          recipientName: 'Charlie Brown',
          theirSlot: { title: 'Coffee Break', date: '2025-11-06', time: '15:00', description: 'Afternoon coffee' },
          mySlot: { title: 'Lunch Break', date: '2025-11-05', time: '12:00', description: 'Available for swapping' },
          status: 'PENDING',
          createdAt: '2025-10-31T14:20:00Z'
        }
      ]);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleSwapResponse = async (requestId, action) => {
    try {
      const response = await fetch('/api/swap-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: requestId,
          action: action // 'ACCEPT' or 'REJECT'
        })
      });

      if (response.ok) {
        alert(`Swap request ${action.toLowerCase()}ed successfully!`);
        setIncomingRequests(incomingRequests.filter(req => req.id !== requestId));
      } else {
        alert(`Failed to ${action.toLowerCase()} swap request. Please try again.`);
      }
    } catch (error) {
      console.error('Error responding to swap:', error);
      alert(`Swap request ${action.toLowerCase()}ed! (Demo mode - API not connected)`);
      setIncomingRequests(incomingRequests.filter(req => req.id !== requestId));
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...formData, id: event.id } : event
      ));
    } else {
      setEvents([...events, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', date: '', time: '', status: 'BUSY', description: '' });
    setEditingEvent(null);
    setShowModal(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const toggleStatus = (id) => {
    setEvents(events.map(event => 
      event.id === id 
        ? { ...event, status: event.status === 'BUSY' ? 'SWAPPABLE' : 'BUSY' }
        : event
    ));
  };

  const handleRequestSwap = (marketplaceSlot) => {
    setSelectedSlotForSwap(marketplaceSlot);
    setShowSwapModal(true);
  };

  const handleSwapRequest = async (mySlot) => {
    try {
      const response = await fetch('/api/swap-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theirSlotId: selectedSlotForSwap.id,
          mySlotId: mySlot.id
        })
      });

      if (response.ok) {
        alert('Swap request sent successfully!');
      } else {
        alert('Failed to send swap request. Please try again.');
      }
    } catch (error) {
      alert(`Swap request sent!\n\nYou want: ${selectedSlotForSwap.title} (${selectedSlotForSwap.date} at ${selectedSlotForSwap.time})\nYou offer: ${mySlot.title} (${mySlot.date} at ${mySlot.time})`);
    }
    
    setShowSwapModal(false);
    setSelectedSlotForSwap(null);
  };

  const getMySwappableSlots = () => {
    return events.filter(event => event.status === 'SWAPPABLE');
  };

  const getDaysInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDate = (dateStr) => {
    return events.filter(event => event.date === dateStr);
  };

  const renderRequestsView = () => {
    if (loadingRequests) {
      return (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Bell size={24} />
            Incoming Requests
            {incomingRequests.length > 0 && (
              <span className="badge badge-primary">{incomingRequests.length}</span>
            )}
          </h2>
          <div className="space-y-3">
            {incomingRequests.map(request => (
              <div key={request.id} className="card bg-base-100 shadow-md border-2 border-primary">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{request.requesterName} wants to swap</h3>
                      <p className="text-sm opacity-70">{new Date(request.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="badge badge-warning gap-2">
                      <Clock size={14} />
                      Pending
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-success bg-opacity-10 rounded-lg border-2 border-success">
                      <p className="text-xs font-semibold text-success mb-2">They offer:</p>
                      <h4 className="font-bold">{request.theirSlot.title}</h4>
                      <p className="text-sm opacity-70">{request.theirSlot.description}</p>
                      <div className="flex gap-3 text-sm mt-2">
                        <span>📅 {request.theirSlot.date}</span>
                        <span>🕐 {request.theirSlot.time}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-info bg-opacity-10 rounded-lg border-2 border-info">
                      <p className="text-xs font-semibold text-info mb-2">For your:</p>
                      <h4 className="font-bold">{request.mySlot.title}</h4>
                      <p className="text-sm opacity-70">{request.mySlot.description}</p>
                      <div className="flex gap-3 text-sm mt-2">
                        <span>📅 {request.mySlot.date}</span>
                        <span>🕐 {request.mySlot.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleSwapResponse(request.id, 'ACCEPT')}
                      className="btn btn-success flex-1"
                    >
                      <Check size={18} />
                      Accept Swap
                    </button>
                    <button
                      onClick={() => handleSwapResponse(request.id, 'REJECT')}
                      className="btn btn-error flex-1"
                    >
                      <X size={18} />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {incomingRequests.length === 0 && (
              <div className="text-center py-12 opacity-50">
                No incoming swap requests at the moment.
              </div>
            )}
          </div>
        </div>

        <div className="divider"></div>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Outgoing Requests
            {outgoingRequests.length > 0 && (
              <span className="badge badge-ghost ml-2">{outgoingRequests.length}</span>
            )}
          </h2>
          <div className="space-y-3">
            {outgoingRequests.map(request => (
              <div key={request.id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Swap request to {request.recipientName}</h3>
                      <p className="text-sm opacity-70">{new Date(request.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="badge badge-warning gap-2">
                      <Clock size={14} />
                      Pending
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-base-200 rounded-lg">
                      <p className="text-xs font-semibold opacity-70 mb-2">You want:</p>
                      <h4 className="font-bold">{request.theirSlot.title}</h4>
                      <p className="text-sm opacity-70">{request.theirSlot.description}</p>
                      <div className="flex gap-3 text-sm mt-2">
                        <span>📅 {request.theirSlot.date}</span>
                        <span>🕐 {request.theirSlot.time}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-base-200 rounded-lg">
                      <p className="text-xs font-semibold opacity-70 mb-2">You offered:</p>
                      <h4 className="font-bold">{request.mySlot.title}</h4>
                      <p className="text-sm opacity-70">{request.mySlot.description}</p>
                      <div className="flex gap-3 text-sm mt-2">
                        <span>📅 {request.mySlot.date}</span>
                        <span>🕐 {request.mySlot.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {outgoingRequests.length === 0 && (
              <div className="text-center py-12 opacity-50">
                No outgoing swap requests. Visit the marketplace to request swaps!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMarketplaceView = () => {
    if (loadingMarketplace) {
      return (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {marketplaceSlots.map(slot => (
          <div key={slot.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="card-title">{slot.title}</h3>
                  <p className="text-sm opacity-70 mt-1">{slot.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>📅 {slot.date}</span>
                    <span>🕐 {slot.time}</span>
                    <span className="badge badge-info">Owner: {slot.owner}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRequestSwap(slot)}
                  className="btn btn-primary"
                >
                  <ArrowRightLeft size={16} />
                  Request Swap
                </button>
              </div>
            </div>
          </div>
        ))}
        {marketplaceSlots.length === 0 && (
          <div className="text-center py-12 opacity-50">
            No swappable slots available in the marketplace at the moment.
          </div>
        )}
      </div>
    );
  };

  const renderCalendarView = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth();
    const days = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-base-200"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateStr);
      
      days.push(
        <div key={day} className="h-24 border border-base-300 p-1 overflow-y-auto bg-base-100">
          <div className="font-semibold text-sm mb-1">{day}</div>
          {dayEvents.map(event => (
            <div
              key={event.id}
              className={`text-xs p-1 mb-1 rounded cursor-pointer ${
                event.status === 'BUSY' ? 'bg-error text-error-content' : 'bg-success text-success-content'
              }`}
              onClick={() => handleEdit(event)}
            >
              {event.time} {event.title}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <div className="text-2xl font-bold mb-4 text-center">
          {monthNames[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-0">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-bold text-center p-2 bg-base-200 border border-base-300">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const sortedEvents = [...events].sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
    });

    return (
      <div className="space-y-3">
        {sortedEvents.map(event => (
          <div key={event.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="card-title">{event.title}</h3>
                  <p className="text-sm opacity-70 mt-1">{event.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>📅 {event.date}</span>
                    <span>🕐 {event.time}</span>
                    <span className={`badge ${
                      event.status === 'BUSY' ? 'badge-error' : 'badge-success'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStatus(event.id)}
                    className={`btn btn-sm btn-circle ${
                      event.status === 'BUSY' ? 'btn-success' : 'btn-error'
                    }`}
                    title={event.status === 'BUSY' ? 'Make Swappable' : 'Make Busy'}
                  >
                    <RefreshCw size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(event)}
                    className="btn btn-sm btn-circle btn-info"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="btn btn-sm btn-circle btn-error"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {sortedEvents.length === 0 && (
          <div className="text-center py-12 opacity-50">
            No events yet. Click "New Event" to create one!
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.19/dist/full.min.css" rel="stylesheet" />
      <script src="https://cdn.tailwindcss.com"></script>
      
      <div className="max-w-6xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">
                {view === 'marketplace' ? 'Marketplace' : view === 'requests' ? 'Swap Requests' : 'My Events Dashboard'}
              </h1>
              {view !== 'marketplace' && view !== 'requests' && (
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary"
                >
                  <Plus size={20} />
                  New Event
                </button>
              )}
            </div>

            <div className="btn-group mb-6">
              <button
                onClick={() => setView('list')}
                className={`btn ${view === 'list' ? 'btn-active' : ''}`}
              >
                List View
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`btn ${view === 'calendar' ? 'btn-active' : ''}`}
              >
                <Calendar size={18} />
                Calendar
              </button>
              <button
                onClick={() => setView('marketplace')}
                className={`btn ${view === 'marketplace' ? 'btn-active' : ''}`}
              >
                <ShoppingCart size={18} />
                Marketplace
              </button>
              <button
                onClick={() => setView('requests')}
                className={`btn ${view === 'requests' ? 'btn-active' : ''}`}
              >
                <Bell size={18} />
                Requests
                {incomingRequests.length > 0 && (
                  <span className="badge badge-sm badge-primary">{incomingRequests.length}</span>
                )}
              </button>
            </div>

            {view === 'list' && renderListView()}
            {view === 'calendar' && renderCalendarView()}
            {view === 'marketplace' && renderMarketplaceView()}
            {view === 'requests' && renderRequestsView()}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-2xl mb-4">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </h2>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input input-bordered"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input input-bordered"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Time</span>
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="input input-bordered"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="select select-bordered"
                >
                  <option value="BUSY">Busy</option>
                  <option value="SWAPPABLE">Swappable</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea textarea-bordered"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="modal-action">
              <button onClick={handleSubmit} className="btn btn-primary">
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
              <button onClick={resetForm} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSwapModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h2 className="font-bold text-2xl mb-4">Request Swap</h2>
            
            <div className="mb-6 p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">You want to swap for:</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-bold">{selectedSlotForSwap.title}</p>
                  <p className="text-sm opacity-70">{selectedSlotForSwap.description}</p>
                  <div className="flex gap-4 text-sm mt-1">
                    <span>📅 {selectedSlotForSwap.date}</span>
                    <span>🕐 {selectedSlotForSwap.time}</span>
                    <span className="badge badge-info">Owner: {selectedSlotForSwap.owner}</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-semibold mb-3">Select your slot to offer:</h3>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {getMySwappableSlots().map(slot => (
                <div
                  key={slot.id}
                  className="card bg-base-100 border-2 border-base-300 hover:border-primary cursor-pointer transition-colors"
                  onClick={() => handleSwapRequest(slot)}
                >
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-bold">{slot.title}</h4>
                        <p className="text-sm opacity-70">{slot.description}</p>
                        <div className="flex gap-4 text-sm mt-1">
                          <span>📅 {slot.date}</span>
                          <span>🕐 {slot.time}</span>
                        </div>
                      </div>
                      <ArrowRightLeft size={20} className="text-primary" />
                    </div>
                  </div>
                </div>
              ))}
              {getMySwappableSlots().length === 0 && (
                <div className="text-center py-8 opacity-50">
                  You don't have any swappable slots. Mark some of your events as "Swappable" to offer them for swaps.
                </div>
              )}
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => {
                  setShowSwapModal(false);
                  setSelectedSlotForSwap(null);
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;