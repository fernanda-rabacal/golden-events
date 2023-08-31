import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/PasswordInput"; 
import { Button } from "@/components/Button";
import styles from "./styles.module.scss"
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign } from "crypto";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { toastNotify } from "@/lib/toastify";


const loginFormSchema = z.object({
  email: z.string().email({ message: "Email é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" })
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  })

  const { signIn } = useContext(AuthContext)

  return(
    <>
      <Head>
        <title>Login - Eventos</title>
      </Head>
      <main className={styles.loginContainer}>
        <ToastContainer />

          <h1>Acesse sua conta</h1>

          <form className={styles.formContainer} onSubmit={handleSubmit(signIn)}>
            <div>
              <label htmlFor="email">E-mail</label>
              <Input type="email" id="email" required {...register('email')} />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <PasswordInput id="password" {...register('password')} required />
            </div>

            <div className={styles.keepConnectedContainer}>
              <input type="checkbox" id="keep-connect" />
              <label htmlFor="keep-connect">Mantenha-me conectado</label>
            </div>

            <Button>Login</Button>
            <p>Esqueceu sua senha? <Link href="#">Clique aqui</Link></p>

            <hr />

            <p>Não possui conta? <Link href="/cadastro">Cadastre-se!</Link></p>
          </form>
      </main>
    </>
  )
}