import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, Radio, ShoppingBag, List } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const menuItems = [
    { path: '/', label: 'Homepage', icon: Home },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/forum', label: 'Forum', icon: Users },
    { path: '/livestream', label: 'Live Streaming', icon: Radio },
    { path: '/shop', label: 'Shop', icon: ShoppingBag },
    { path: '/dashboard', label: 'Dashboard', icon: List },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex px-6 items-center">
        <img
          src="/SalingTau-logo.jpg"
          alt="Logo"
          className="h-10 w-10 object-contain rounded-lg"
        />
      </div>
      <nav className="flex-1 px-4 py-2 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link
        to="/profile"
        className="block px-4 py-4 mt-auto border-t border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?q=80&w=2574&auto=format&fit=crop"
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900">Andi Pratama</p>
            <p className="text-xs text-gray-500">andi.p@email.com</p>
          </div>
        </div>
      </Link>
    </aside>
  );
}
