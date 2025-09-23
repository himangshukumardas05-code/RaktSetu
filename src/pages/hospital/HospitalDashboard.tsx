import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { DashboardCard } from "../../components/dashboard/DashboardCard";
import {
  Heart,
  Clock,
  Package,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { BloodGroup } from "../../types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const HospitalDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const recentRequests = [
    {
      id: "1",
      bloodGroup: "O-" as BloodGroup,
      units: 3,
      urgency: "critical",
      status: "pending",
      requestDate: "2024-01-28",
      patientId: "P001",
      department: "Emergency",
    },
    {
      id: "2",
      bloodGroup: "A+" as BloodGroup,
      units: 2,
      urgency: "high",
      status: "approved",
      requestDate: "2024-01-28",
      patientId: "P002",
      department: "Surgery",
    },
    {
      id: "3",
      bloodGroup: "B+" as BloodGroup,
      units: 1,
      urgency: "medium",
      status: "fulfilled",
      requestDate: "2024-01-27",
      patientId: "P003",
      department: "ICU",
    },
  ];

  const inventory = [
    { bloodGroup: "A+" as BloodGroup, available: 12, reserved: 3, expiring: 1 },
    { bloodGroup: "A-" as BloodGroup, available: 8, reserved: 1, expiring: 0 },
    { bloodGroup: "B+" as BloodGroup, available: 15, reserved: 2, expiring: 2 },
    { bloodGroup: "B-" as BloodGroup, available: 5, reserved: 0, expiring: 1 },
    { bloodGroup: "AB+" as BloodGroup, available: 7, reserved: 1, expiring: 0 },
    { bloodGroup: "AB-" as BloodGroup, available: 3, reserved: 0, expiring: 0 },
    { bloodGroup: "O+" as BloodGroup, available: 20, reserved: 5, expiring: 3 },
    { bloodGroup: "O-" as BloodGroup, available: 6, reserved: 2, expiring: 1 },
  ];

  const donors = [
    { id: "D001", name: "Rahul Sharma", bloodGroup: "A+", lastDonation: "2024-01-10", contact: "9876543210" },
    { id: "D002", name: "Priya Singh", bloodGroup: "O-", lastDonation: "2023-12-15", contact: "8765432109" },
    { id: "D003", name: "Amit Verma", bloodGroup: "B+", lastDonation: "2024-01-05", contact: "7654321098" },
  ];

  const monthlyTrends = [
    { month: "Jan", requests: 32, donations: 28 },
    { month: "Feb", requests: 45, donations: 38 },
    { month: "Mar", requests: 28, donations: 30 },
    { month: "Apr", requests: 50, donations: 47 },
  ];

  const urgencyColors: Record<string, string> = {
    critical: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
    fulfilled: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const statusIcons: Record<string, any> = {
    pending: Clock,
    approved: CheckCircle,
    fulfilled: Package,
    rejected: XCircle,
  };

  // Export PDF function
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Hospital Blood Report", 14, 20);

    doc.setFontSize(14);
    doc.text("Inventory", 14, 35);
    autoTable(doc, {
      startY: 40,
      head: [["Blood Group", "Available", "Reserved", "Expiring"]],
      body: inventory.map((item) => [
        item.bloodGroup,
        item.available.toString(),
        item.reserved.toString(),
        item.expiring.toString(),
      ]),
    });

    const finalY = (doc as any).lastAutoTable.finalY || 70;
    doc.text("Recent Requests", 14, finalY + 10);
    autoTable(doc, {
      startY: finalY + 15,
      head: [["ID", "Blood Group", "Units", "Urgency", "Status", "Department"]],
      body: recentRequests.map((r) => [
        r.id,
        r.bloodGroup,
        r.units.toString(),
        r.urgency,
        r.status,
        r.department,
      ]),
    });

    doc.save("hospital_dashboard_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
            <p className="text-gray-600">City General Hospital - {user?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
              <Plus className="h-4 w-4" /> <span>New Request</span>
            </button>
            <button
              onClick={handleExport}
              className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
            >
              <Download className="h-4 w-4" /> <span>Export Data</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Active Requests" value="8" icon={FileText} color="blue" trend={{ value: 12, isPositive: true }} description="Pending blood requests" />
          <DashboardCard title="Inventory Units" value="76" icon={Heart} color="red" trend={{ value: -3, isPositive: false }} description="Total blood units" />
          <DashboardCard title="Critical Alerts" value="4" icon={AlertTriangle} color="yellow" description="Low stock warnings" />
          <DashboardCard title="This Month" value="32" icon={Package} color="green" trend={{ value: 18, isPositive: true }} description="Units received" />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {["overview", "requests", "inventory", "donors", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>
              {recentRequests.map((req) => (
                <div key={req.id} className="flex justify-between p-3 border-b">
                  <div>
                    <p className="font-medium">{req.bloodGroup} - {req.units} units</p>
                    <p className="text-sm text-gray-600">{req.department} • Patient {req.patientId}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${urgencyColors[req.urgency]}`}>{req.urgency}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[req.status]}`}>{req.status}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Blood Inventory</h3>
              <div className="grid grid-cols-2 gap-4">
                {inventory.map((item) => (
                  <div key={item.bloodGroup} className="p-3 bg-gray-50 rounded-lg flex justify-between">
                    <p>{item.bloodGroup} ({item.available})</p>
                    {item.expiring > 0 && <span className="text-red-600 text-xs">{item.expiring} expiring</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <motion.div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Blood Requests</h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th>Blood Group</th>
                  <th>Units</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td className="px-4 py-2">#{r.id}</td>
                    <td>{r.bloodGroup}</td>
                    <td>{r.units}</td>
                    <td><span className={`px-2 py-1 text-xs border rounded-full ${urgencyColors[r.urgency]}`}>{r.urgency}</span></td>
                    <td><span className={`px-2 py-1 text-xs rounded-full ${statusColors[r.status]}`}>{r.status}</span></td>
                    <td>{r.department}</td>
                    <td><button className="text-purple-600 mr-2">View</button><button className="text-blue-600">Update</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <motion.div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Blood Inventory Management</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {inventory.map((item) => (
                <div key={item.bloodGroup} className="border p-4 rounded-lg">
                  <h4 className="font-bold text-red-600 mb-2">{item.bloodGroup}</h4>
                  <p>Available: {item.available}</p>
                  <p>Reserved: {item.reserved}</p>
                  <p className={item.expiring > 0 ? "text-red-600" : "text-green-600"}>Expiring: {item.expiring}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Donors Tab */}
        {activeTab === "donors" && (
          <motion.div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Registered Donors</h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Last Donation</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((d) => (
                  <tr key={d.id} className="border-b">
                    <td className="px-4 py-2">{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.bloodGroup}</td>
                    <td>{d.lastDonation}</td>
                    <td>{d.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <motion.div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">Reports & Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#f87171" name="Requests" />
                <Line type="monotone" dataKey="donations" stroke="#60a5fa" name="Donations" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
};