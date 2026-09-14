/**
 * Guard de route : vérifie le statut d'authentification avant de rendre les routes enfants.
 *
 * TODO 2 : Protection de la route `/profile` selon `status`
 *  - 'loading'       → affiche un message/spinner de chargement
 *  - 'anonymous'     → redirige vers `/login` (avec <Navigate to="/login" replace />)
 *  - 'authenticated' → rend les routes enfants (via <Outlet />)
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute() {
  const { status } = useAuth();

  if (status === 'loading') {
    return (
      <div className="flex justify-center p-12 text-slate-500">
        Vérification de la session en cours…
      </div>
    );
  }

  if (status === 'anonymous') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
