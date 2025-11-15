import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { apiService } from "@/services/api";

export default function Formulario() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    discord: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate() {
    const nextErrors: Record<string, string> = {};
    
    // Validação de nome
    if (!form.nome.trim()) {
      nextErrors.nome = "Informe seu nome.";
    } else if (form.nome.trim().length < 2) {
      nextErrors.nome = "Nome deve ter pelo menos 2 caracteres.";
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(form.nome.trim())) {
      nextErrors.nome = "Nome deve conter apenas letras e espaços.";
    }
    
    // Validação de email
    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "E-mail inválido.";
    }
    
    // Validação de telefone
    const digits = form.telefone.replace(/\D/g, "");
    if (!digits) {
      nextErrors.telefone = "Informe seu telefone.";
    } else if (digits.length < 10 || digits.length > 11) {
      nextErrors.telefone = "Telefone deve ter 10 ou 11 dígitos.";
    }
    
    // Validação de Discord
    if (!form.discord.trim()) {
      nextErrors.discord = "Informe seu usuário do Discord.";
    } else if (!/^[a-zA-Z0-9_.#]+$/.test(form.discord.trim())) {
      nextErrors.discord = "Usuário Discord inválido (use apenas letras, números, _ e #).";
    } else if (form.discord.trim().length < 2) {
      nextErrors.discord = "Discord deve ter pelo menos 2 caracteres.";
    }
    
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange<K extends keyof typeof form>(key: K, value: string) {
    if (key === 'telefone') {
      // Formatar telefone em tempo real e limitar a 11 dígitos
      const cleaned = value.replace(/\D/g, '').slice(0, 11);
      let formatted = cleaned;
      if (cleaned.length <= 10) {
        formatted = cleaned.replace(/(\d{2})(\d{0,4})(\d{0,4})/, '($1) $2-$3').trim();
      } else {
        formatted = cleaned.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3').trim();
      }
      setForm((prev) => ({ ...prev, [key]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [key]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      // Enviar telefone sem formatação para o backend
      const formData = {
        ...form,
        telefone: form.telefone.replace(/\D/g, '') // Remove caracteres não numéricos
      };
      await apiService.submitForm(formData);
      setStatus("success");
      setForm({ nome: "", email: "", telefone: "", discord: "" });
      setErrors({});
    } catch (error: any) {
      setStatus("error");
      if (error.message.includes('email já foi cadastrado')) {
        setErrors({ email: 'Este email já foi cadastrado anteriormente.' });
      } else if (error.message.includes('Muitas tentativas')) {
        setErrors({ general: 'Você atingiu o limite de envios. Tente novamente mais tarde.' });
      } else {
        setErrors({ general: 'Ocorreu um erro ao enviar. Tente novamente.' });
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Formulário de Participação
            </motion.h1>
            <p className="text-gray-400 mb-10">Preencha seus dados para confirmar interesse.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent">
              <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-sm p-6 sm:p-8">
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid sm:grid-cols-2 gap-6"
                >
                  <div className="flex flex-col">
                    <label htmlFor="nome" className="text-sm text-gray-300 mb-2">Nome</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      value={form.nome}
                      onChange={(e) => handleChange("nome", e.target.value)}
                      required
                      aria-invalid={Boolean(errors.nome)}
                      aria-describedby={errors.nome ? "error-nome" : undefined}
                      placeholder="Seu nome"
                      className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.nome && (
                      <p id="error-nome" className="mt-2 text-sm text-red-400">{errors.nome}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm text-gray-300 mb-2">E-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "error-email" : undefined}
                      placeholder="Seu e-mail"
                      className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.email && (
                      <p id="error-email" className="mt-2 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="telefone" className="text-sm text-gray-300 mb-2">Telefone</label>
                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      value={form.telefone}
                      onChange={(e) => handleChange("telefone", e.target.value)}
                      required
                      aria-invalid={Boolean(errors.telefone)}
                      aria-describedby={errors.telefone ? "error-telefone" : undefined}
                      placeholder="Seu telefone"
                      className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.telefone && (
                      <p id="error-telefone" className="mt-2 text-sm text-red-400">{errors.telefone}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="discord" className="text-sm text-gray-300 mb-2">Discord</label>
                    <input
                      id="discord"
                      name="discord"
                      type="text"
                      value={form.discord}
                      onChange={(e) => handleChange("discord", e.target.value)}
                      required
                      aria-invalid={Boolean(errors.discord)}
                      aria-describedby={errors.discord ? "error-discord" : undefined}
                      placeholder="Seu usuário do Discord"
                      className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.discord && (
                      <p id="error-discord" className="mt-2 text-sm text-red-400">{errors.discord}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-2 inline-flex items-center justify-center bg-black border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 sm:col-span-2 disabled:opacity-60"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar"}
                  </button>

                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="sm:col-span-2 mt-2 text-green-400"
                    >
                      Dados enviados com sucesso!
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="sm:col-span-2 mt-2 text-red-400"
                    >
                      {errors.general || 'Ocorreu um erro ao enviar. Tente novamente.'}
                    </motion.div>
                  )}
                </motion.form>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
