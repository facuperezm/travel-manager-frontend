import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signUpSchema = z.object({
  email: z.string().email(),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync: createAccount } = useMutation({
    mutationFn: () => {
      return [''];
    },
  });

  async function handleCreateAccount({ email }: SignUpSchema) {
    try {
      await createAccount({ email });

      toast.success('', {
        description: '',
        action: {
          label: 'Login',
          onClick: () => {
            navigate(`/sign-in?email=${email}`);
          },
        },
      });
    } catch (err) {
      toast.error('There was an error creating your account');
    }
  }

  return (
    <div className="lg:p-8">
      <a
        href="/sign-in"
        className={twMerge(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </a>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create a trip
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a trip and invite your friends to join you.
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(handleCreateAccount)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Your email</Label>
                <Input
                  id="name"
                  type="text"
                  autoCorrect="off"
                  {...register('email')}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                Create a trip
              </Button>
            </div>
          </form>
        </div>

        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
          By continuing, you agree to our{' '}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of service
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
