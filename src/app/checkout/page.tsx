"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<"cart" | "form" | "success">("cart");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    address: "",
    city: "",
    state: "",
    cep: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full border-2 border-primary mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="font-display text-4xl tracking-wider mb-4">PEDIDO CONFIRMADO</h1>
          <p className="text-muted mb-8">
            Obrigado pela sua compra! Você receberá um e-mail com os detalhes do pedido e informações de rastreamento.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all"
          >
            Voltar à Loja
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingCart className="w-16 h-16 text-border mx-auto mb-6" />
          <h1 className="font-display text-4xl tracking-wider mb-4">CARRINHO VAZIO</h1>
          <p className="text-muted mb-8">
            Seu carrinho está vazio. Explore nosso catálogo para encontrar as melhores cartas!
          </p>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all"
          >
            Ver Catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border bg-surface py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuar Comprando
          </Link>
          <div className="accent-line mb-4" />
          <h1 className="font-display text-5xl tracking-wider">
            {step === "cart" ? "CARRINHO" : "FINALIZAR PEDIDO"}
          </h1>
          <p className="text-muted mt-2">
            {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex gap-4 p-4 bg-surface border border-border"
                >
                  {/* Mini Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-surface-light border border-border flex items-center justify-center">
                    <span className="text-2xl opacity-50">
                      {item.product.game === "pokemon" ? "⚡" : item.product.game === "magic" ? "✦" : "◆"}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-grow min-w-0">
                    <Link
                      href={`/produto/${item.product.id}`}
                      className="text-sm font-semibold hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">
                      {item.product.set || item.product.game}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-light transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center text-sm font-semibold border-x border-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-light transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-display text-xl tracking-wide">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 text-muted hover:text-primary transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-surface border border-border p-6 sticky top-24">
                <h3 className="font-display text-2xl tracking-wider mb-6">RESUMO</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Frete</span>
                    <span className="text-primary text-xs uppercase tracking-wider font-semibold">A calcular</span>
                  </div>
                  <div className="pokeball-divider my-4" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted font-semibold">Total</span>
                    <span className="font-display text-3xl tracking-wide">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep("form")}
                  className="w-full mt-6 py-4 bg-primary text-white font-sans font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all"
                >
                  <CreditCard className="w-4 h-4" />
                  Finalizar Compra
                </button>

                <p className="text-[11px] text-muted text-center mt-3">
                  Pagamento seguro via PIX, cartão ou boleto
                </p>
              </div>
            </div>
          </div>
        )}

        {step === "form" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-display text-2xl tracking-wider mb-6">DADOS PESSOAIS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-muted uppercase tracking-wider mb-2">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-surface border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-border-light"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-wider mb-2">E-mail</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-border-light"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-wider mb-2">CPF</label>
                    <input
                      type="text"
                      required
                      value={formData.cpf}
                      onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                      className="w-full bg-surface border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-border-light"
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
              </div>

              <div className="pokeball-divider" />

              <div>
                <h3 className="font-display text-2xl tracking-wider mb-6">ENDEREÇO DE ENTREGA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-muted uppercase tracking-wider mb-2">Endereço</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-surface border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-border-light"
                      placeholder="Rua, número, complemento"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-wider mb-2">Cidade</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-surface border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-border-light"
                      placeholder="Sua cidade"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-wider mb-2">Estado</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-surface border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-border-light"
                        placeholder="UF"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-wider mb-2">CEP</label>
                      <input
                        type="text"
                        required
                        value={formData.cep}
                        onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                        className="w-full bg-surface border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-border-light"
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pokeball-divider" />

              <div>
                <h3 className="font-display text-2xl tracking-wider mb-6">PAGAMENTO</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {["PIX", "Cartão de Crédito", "Boleto"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      className="p-4 bg-surface border border-border text-sm font-semibold text-center hover:border-primary hover:text-primary transition-colors focus:border-primary focus:text-primary"
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-sans font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all mt-8"
              >
                Confirmar Pedido — R$ {totalPrice.toFixed(2)}
              </button>
            </form>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-surface border border-border p-6 sticky top-24">
                <h3 className="font-display text-xl tracking-wider mb-4">ITENS ({totalItems})</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 flex-shrink-0 bg-surface-light border border-border flex items-center justify-center">
                        <span className="text-sm opacity-50">
                          {item.product.game === "pokemon" ? "⚡" : item.product.game === "magic" ? "✦" : "◆"}
                        </span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="truncate text-xs font-semibold">{item.product.name}</p>
                        <p className="text-xs text-muted">{item.quantity}x R$ {item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pokeball-divider my-4" />
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted">Total</span>
                  <span className="font-display text-2xl tracking-wide">R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
