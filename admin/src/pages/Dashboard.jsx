import { Package, Users, ShoppingCart, Eye } from 'lucide-react'; 

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Products',
      value: 1245,
      icon: <Package className="w-6 h-6 text-white" />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Total Users',
      value: 842,
      icon: <Users className="w-6 h-6 text-white" />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'Orders',
      value: 320,
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      bgColor: 'bg-purple-500',
    },
    {
      title: 'Views',
      value: 16789,
      icon: <Eye className="w-6 h-6 text-white" />,
      bgColor: 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6"> 
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 bg-white shadow-md rounded-2xl border border-gray-100 hover:shadow-xl transition"
          >
            <div className={`p-3 rounded-full ${item.bgColor}`}>
              {item.icon}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{item.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
