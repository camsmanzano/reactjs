'use client';

import { useState, useEffect } from 'react';
import ServiceForm from './ServiceForm';
import ServiceDetails from './ServiceDetails';

const Home = () => {
  const [currentView, setCurrentView] = useState('home');
  const [serviceRequests, setServiceRequests] = useState([]);

  // Initialize with mock data and load from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('serviceRequests');
    if (savedRequests) {
      setServiceRequests(JSON.parse(savedRequests));
    } else {
      // Initialize with mock data if no saved data exists
      const mockData = [
        {
          id: 1001,
          customerName: 'John Doe',
          email: 'john.doe@example.com',
          serviceType: 'Technical',
          priority: 'High',
          status: 'Open',
          description: 'Unable to access my account after the recent system update. Getting error message when trying to log in.',
          submittedAt: '2024-01-15T10:30:00.000Z'
        },
        {
          id: 1002,
          customerName: 'Jane Smith',
          email: 'jane.smith@example.com',
          serviceType: 'Billing',
          priority: 'Medium',
          status: 'In Progress',
          description: 'Incorrect charges on my monthly bill. Need clarification on the additional fees that were added.',
          submittedAt: '2024-01-14T14:45:00.000Z'
        },
        {
          id: 1003,
          customerName: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          serviceType: 'General',
          priority: 'Low',
          status: 'Resolved',
          description: 'Request for information about new features and how to use them effectively.',
          submittedAt: '2024-01-13T09:15:00.000Z'
        },
        {
          id: 1004,
          customerName: 'Sarah Wilson',
          email: 'sarah.wilson@example.com',
          serviceType: 'Complaint',
          priority: 'Urgent',
          status: 'Open',
          description: 'Very poor customer service experience. Representative was rude and unhelpful during my call yesterday.',
          submittedAt: '2024-01-16T16:20:00.000Z'
        },
        {
          id: 1005,
          customerName: 'David Lee',
          email: 'david.lee@example.com',
          serviceType: 'Technical',
          priority: 'High',
          status: 'In Progress',
          description: 'System crashes frequently when performing routine tasks. Need urgent assistance to resolve this issue.',
          submittedAt: '2024-01-16T11:00:00.000Z'
        },
      ];
      setServiceRequests(mockData);
      localStorage.setItem('serviceRequests', JSON.stringify(mockData));
    }
  }, []);

  const handleFormSubmit = (newRequest) => {
    const updatedRequests = [newRequest, ...serviceRequests];
    setServiceRequests(updatedRequests);
    // Save to localStorage
    localStorage.setItem('serviceRequests', JSON.stringify(updatedRequests));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'form':
        return <ServiceForm onSubmit={handleFormSubmit} />;
      case 'details':
        return <ServiceDetails serviceRequests={serviceRequests} />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Customer Service Management
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Submit Request Card */}
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Submit Request</h3>
                  <p className="text-gray-600 mb-6">
                    Create a new service request.
                  </p>
                  <button
                    onClick={() => setCurrentView('form')}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
                  >
                    Submit New Request
                  </button>
                </div>
              </div>

              {/* View Requests Card */}
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">View Requests</h3>
                  <p className="text-gray-600 mb-6">
                    Browse and manage all service requests.
                  </p>
                  <button
                    onClick={() => setCurrentView('details')}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium"
                  >
                    View All Requests
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentView('home')}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                Customer Service Portal
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('form')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === 'form'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Submit Request
              </button>
              <button
                onClick={() => setCurrentView('details')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === 'details'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                View Requests
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {renderCurrentView()}
      </main>
    </div>
  )}
export default Home;
