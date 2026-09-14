import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

export default function App() {
  const { status, user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-800 hover:text-slate-600">
            🔐 TP React Auth
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }
            >
              Accueil
            </NavLink>

            {status === 'authenticated' && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }
              >
                Profil
              </NavLink>
            )}

            {status === 'authenticated' ? (
              <div className="flex items-center space-x-4">
                <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                  👤 {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-200 transition"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md bg-blue-600 px-3 py-1.5 text-white'
                    : 'rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800'
                }
              >
                Se connecter
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl py-8">
        <Outlet />
      </main>
    </div>
  );
}
