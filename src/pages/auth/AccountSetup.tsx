
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
import { BookOpen, Loader } from 'lucide-react';

const AccountSetup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const { t } = useLocalization();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-4">{t('invalid_setup_link')}</h2>
            <p className="text-center text-gray-600">
              {t('invalid_setup_link_description')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: t('error'),
        description: t('please_fill_in_all_fields'),
        variant: 'destructive',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: t('error'),
        description: t('passwords_do_not_match'),
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t('error'),
        description: t('password_must_be_at_least_6_characters'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate account setup and login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify the token and set up the account
      await login(email, password);
      
      toast({
        title: t('success'),
        description: t('account_setup_successful'),
      });
      
      // Redirect based on role (this would come from the token verification)
      navigate('/student'); // Default redirect, would be dynamic based on user role
    } catch (error) {
      toast({
        title: t('error'),
        description: t('failed_to_setup_account'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('set_up_your_account')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('create_password_for')}: <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder={t('enter_your_password')}
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">{t('confirm_password')}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
                placeholder={t('confirm_your_password')}
                minLength={6}
              />
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {t('setting_up_account')}...
                  </>
                ) : (
                  t('set_up_account')
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-xs text-center text-gray-500">
              {t('password_requirements')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetup;
