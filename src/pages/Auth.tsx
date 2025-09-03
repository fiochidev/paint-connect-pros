import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignUpForm } from '@/components/auth/SignUpForm'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {isLogin ? <LoginForm /> : <SignUpForm />}
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
          </p>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="p-0 h-auto"
          >
            {isLogin ? 'Criar conta' : 'Fazer login'}
          </Button>
        </div>
      </div>
    </div>
  )
}