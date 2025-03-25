import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit,
  Trash2,
  LocateFixed,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { Link, useNavigate } from "react-router-dom";
import { OrderTracking } from "./OrderTracking";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "trackOrders", label: "Track Orders", icon: LocateFixed },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

export function UserDashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <nav className="space-y-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-red-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Profile Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={user.phone}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Order History
                  </h2>
                  <div className="space-y-4">
                    {/* Mock Orders */}
                    {[1, 2, 3].map((order) => (
                      <div
                        key={order}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Order #{order}
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Placed on March {order}, 2024
                            </p>
                          </div>
                          <Link
                            to={`/order-tracking/${order}`}
                            className="text-red-600 hover:text-red-700"
                          >
                            Track Order
                          </Link>
                        </div>
                        <div className="flex items-center gap-4">
                          <img
                            src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200"
                            alt="Product"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Malabar Paratha
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              2 items • ₹70
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab == "trackOrders" && <OrderTracking />}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Saved Addresses
                  </h2>
                  <div className="space-y-4">
                    {user.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {address.recipientName}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                ({address.type})
                              </span>
                              {address.isDefault && (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              {address.street}, {address.city}, {address.state}{" "}
                              - {address.pincode}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {address.recipientPhone}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-red-500 hover:text-red-700">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:border-red-600 hover:text-red-600 transition-colors">
                      + Add New Address
                    </button>
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === "favorites" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Favorite Products
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mock Favorites */}
                    {[1, 2, 3, 4].map((product) => (
                      <div
                        key={product}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center gap-4"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200"
                          alt="Product"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Malabar Paratha
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ₹35
                          </p>
                          <button className="mt-2 text-red-600 hover:text-red-700 text-sm">
                            Remove from Favorites
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.notifications}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            Order Updates
                          </span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.newsletter}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            Promotional Emails
                          </span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Dietary Preferences
                      </h3>
                      <div className="space-y-4">
                        {["Vegetarian", "Vegan", "Gluten-Free"].map(
                          (preference) => (
                            <label
                              key={preference}
                              className="flex items-center gap-3"
                            >
                              <input
                                type="checkbox"
                                className="rounded text-red-600 focus:ring-red-500"
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                {preference}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Password
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                          Change Password
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Delete Account
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <button className="bg-red-100 text-red-600 px-6 py-2 rounded-lg hover:bg-red-200 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
