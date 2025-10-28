'use client'

import { useState } from 'react'
import { Package, TrendingUp, Clock, AlertCircle, CheckCircle, Truck, Database, Shield } from 'lucide-react'
import Card from '@/components/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'

export default function PharmacyNetworkTab() {
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null)

  const pharmacyPartners = [
    { name: 'CVS Specialty', status: 'active', apiStatus: 'verified', prescriptions: 2847, avgFillTime: 1.8, onTime: 96 },
    { name: 'Walgreens Specialty', status: 'active', apiStatus: 'verified', prescriptions: 2234, avgFillTime: 2.1, onTime: 94 },
    { name: 'Accredo', status: 'active', apiStatus: 'verified', prescriptions: 1923, avgFillTime: 2.3, onTime: 93 },
    { name: 'Caremark Specialty', status: 'active', apiStatus: 'verified', prescriptions: 1647, avgFillTime: 2.0, onTime: 95 },
    { name: 'Optum Specialty', status: 'active', apiStatus: 'verified', prescriptions: 1432, avgFillTime: 2.2, onTime: 92 },
    { name: 'Diplomat Pharmacy', status: 'active', apiStatus: 'verified', prescriptions: 1189, avgFillTime: 2.4, onTime: 91 },
    { name: 'BriovaRx', status: 'maintenance', apiStatus: 'pending', prescriptions: 892, avgFillTime: 2.5, onTime: 89 },
    { name: 'AllianceRx', status: 'active', apiStatus: 'verified', prescriptions: 683, avgFillTime: 2.1, onTime: 94 },
  ]

  const prescriptionStatus = [
    { status: 'Filled & Shipped', count: 4234, color: '#10B981' },
    { status: 'Processing', count: 342, color: '#2563EB' },
    { status: 'In Transit', count: 187, color: '#F59E0B' },
    { status: 'Pending PA', count: 89, color: '#EF4444' },
  ]

  const refillEligibility = [
    { category: 'Eligible Now', count: 1847, action: 'Send Reminders' },
    { category: 'Due in 7 Days', count: 892, action: 'Queue Outreach' },
    { category: 'Due in 14 Days', count: 1234, action: 'Monitor' },
    { category: 'Overdue', count: 234, action: 'Urgent Contact' },
  ]

  const shipmentData = [
    { day: 'Mon', shipped: 187, delivered: 182, onTime: 97 },
    { day: 'Tue', shipped: 234, delivered: 228, onTime: 97 },
    { day: 'Wed', shipped: 198, delivered: 192, onTime: 97 },
    { day: 'Thu', shipped: 223, delivered: 215, onTime: 96 },
    { day: 'Fri', shipped: 267, delivered: 256, onTime: 96 },
  ]

  const inventoryStatus = [
    { medication: 'Humira', stock: 'In Stock', quantity: 2847, reorderPoint: 500 },
    { medication: 'Enbrel', stock: 'In Stock', quantity: 1923, reorderPoint: 400 },
    { medication: 'Dupixent', stock: 'Low Stock', quantity: 423, reorderPoint: 350 },
    { medication: 'Stelara', stock: 'In Stock', quantity: 1234, reorderPoint: 300 },
    { medication: 'Cosentyx', stock: 'In Stock', quantity: 892, reorderPoint: 250 },
    { medication: 'Otezla', stock: 'Critical', quantity: 124, reorderPoint: 200 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+8 active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">20+</div>
          <div className="text-sm text-gray-600">Pharmacy Partners</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">342 active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">4,852</div>
          <div className="text-sm text-gray-600">Total Prescriptions</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">-0.3 days</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">2.1</div>
          <div className="text-sm text-gray-600">Avg Delivery (days)</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+2.1%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">94.8%</div>
          <div className="text-sm text-gray-600">On-Time Delivery</div>
        </Card>
      </div>

      {/* Pharmacy Network Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Specialty Pharmacy Network</h3>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-success font-medium">Epic EHR Connected</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {pharmacyPartners.map((pharmacy, idx) => (
            <div
              key={idx}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPharmacy === pharmacy.name
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPharmacy(pharmacy.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{pharmacy.prescriptions} prescriptions</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pharmacy.status === 'active'
                      ? 'bg-success/10 text-success'
                      : 'bg-orange-500/10 text-orange-600'
                  }`}>
                    {pharmacy.status}
                  </span>
                  <div className="flex items-center gap-1">
                    {pharmacy.apiStatus === 'verified' ? (
                      <CheckCircle className="w-3 h-3 text-success" />
                    ) : (
                      <Clock className="w-3 h-3 text-orange-500" />
                    )}
                    <span className="text-xs text-gray-600">API {pharmacy.apiStatus}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-600 text-xs">Avg Fill Time</div>
                  <div className="font-medium text-gray-900">{pharmacy.avgFillTime} days</div>
                </div>
                <div>
                  <div className="text-gray-600 text-xs">On-Time Rate</div>
                  <div className="font-medium text-gray-900">{pharmacy.onTime}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Prescription Status & Refill Eligibility */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Real-Time Prescription Status</h3>
          <div className="space-y-4">
            {prescriptionStatus.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-900">{item.status}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{item.count}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Active</div>
            <div className="text-3xl font-bold text-primary">
              {prescriptionStatus.reduce((acc, item) => acc + item.count, 0).toLocaleString()}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Refill Eligibility Dashboard</h3>
          <div className="space-y-4">
            {refillEligibility.map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{item.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{item.action}</div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{item.count}</div>
                </div>
                {item.category === 'Overdue' && (
                  <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Requires immediate attention</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Shipment Tracking */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Shipment Tracking & Delivery Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={shipmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis dataKey="day" stroke="#666666" />
            <YAxis stroke="#666666" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="shipped"
              stroke="#2563EB"
              strokeWidth={2}
              dot={{ fill: '#2563EB', r: 4 }}
              name="Shipped"
            />
            <Line
              type="monotone"
              dataKey="delivered"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 4 }}
              name="Delivered"
            />
            <Line
              type="monotone"
              dataKey="onTime"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#F59E0B', r: 4 }}
              name="On-Time %"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">1,109</div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">1,073</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg">
            <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2.1</div>
            <div className="text-sm text-gray-600">Avg Days</div>
          </div>
        </div>
      </Card>

      {/* Inventory Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Inventory Availability</h3>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-600">Real-time sync</span>
          </div>
        </div>
        <div className="space-y-3">
          {inventoryStatus.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{item.medication}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.stock === 'In Stock'
                      ? 'bg-success/10 text-success'
                      : item.stock === 'Low Stock'
                      ? 'bg-orange-500/10 text-orange-600'
                      : 'bg-red-500/10 text-red-600'
                  }`}>
                    {item.stock}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Quantity: {item.quantity} units</span>
                  <span className="text-gray-600">Reorder at: {item.reorderPoint}</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.quantity > item.reorderPoint * 2
                        ? 'bg-success'
                        : item.quantity > item.reorderPoint
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((item.quantity / (item.reorderPoint * 3)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
