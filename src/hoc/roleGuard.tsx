  'use client';
import { ComponentType, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/UserContext';

interface WithRoleProps {
  requiredRole: string;
}

function withRole<T>(
  WrappedComponent: ComponentType<T>,
  requiredRole: string
) {
  const AuthenticatedRole = (props: T & WithRoleProps) => {
    const router = useRouter();
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
      // Wait until loading is complete
      if (!loading) {
        if (!user) {
          // Redirect to login if no user is logged in
          router.replace('/login');
        } else if (user.role !== requiredRole) {
          // Redirect to home if the user's role does not match
          router.replace('/');
        }
      }
    }, [user, loading, router]);

    // Show loading state if still loading
    if (loading) {
      return <div>Loading...</div>;
    }

    // Show redirect message if role does not match
    if (!user || user.role !== requiredRole) {
      return <div>Redirecting...</div>;
    }

    // Render the wrapped component if the role matches
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedRole;
}

export default withRole;
