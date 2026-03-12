"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!auth) throw new Error("Firebase Auth não está configurado. Verifique as variáveis de ambiente.");
      
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      console.error("Login erro:", err);
      // Firebase auth error translation/handling
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Email ou senha incorretos.");
      } else {
        setError("Ocorreu um erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-surface border border-border rounded-lg p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mb-16" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl mb-2 text-foreground">ENTRAR</h1>
            <p className="text-muted text-sm">Acesse sua conta para comprar cartas e acessórios.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-light border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-light border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold tracking-wider uppercase py-3.5 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4 border border-primary relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? "Entrando..." : "Entrar"}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted">
            Ainda não tem uma conta?{" "}
            <Link href="/register" className="text-primary hover:underline font-semibold">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
