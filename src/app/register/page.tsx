"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    
    const formattedCep = value.length > 5 ? `${value.slice(0, 5)}-${value.slice(5)}` : value;
    setCep(formattedCep);

    if (value.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      if (!auth || !db) {
        throw new Error("Firebase não está configurado. Verifique as variáveis de ambiente.");
      }

      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update Auth Profile (Display Name)
      await updateProfile(user, { displayName: name });

      // 3. Create user document in Firestore 'users' collection
      const fullAddress = `${address}, ${addressNumber}${addressComplement ? ` - ${addressComplement}` : ""}`;
      
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        address: fullAddress,
        createdAt: new Date(),
      });

      // Redirect to home after successful registration
      router.push("/");
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso.");
      } else {
        setError("Ocorreu um erro ao criar a conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl bg-surface border border-border rounded-lg p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mt-16" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl mb-2 text-foreground">CRIAR CONTA</h1>
            <p className="text-muted text-sm">Junte-se à UNAGEEK para comprar suas cartas favoritas.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-light border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="Seu nome"
                />
              </div>

              <div className="md:col-span-2">
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

              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                  CEP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cep}
                    onChange={handleCepChange}
                    maxLength={9}
                    className="w-full bg-surface-light border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                    placeholder="00000-000"
                  />
                  {loadingCep && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                  Endereço
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-surface-light border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="Rua, Bairro, Cidade - UF"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                  Número
                </label>
                <input
                  type="text"
                  required
                  value={addressNumber}
                  onChange={(e) => setAddressNumber(e.target.value)}
                  className="w-full bg-surface-light border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="Ex: 123"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                  Complemento
                </label>
                <input
                  type="text"
                  value={addressComplement}
                  onChange={(e) => setAddressComplement(e.target.value)}
                  className="w-full bg-surface-light border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="Apto, Bloco, etc (Opcional)"
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
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-surface-light border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold tracking-wider uppercase py-3.5 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-6 border border-primary relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? "Criando conta..." : "Registrar"}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
