import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validator/user";
import { z } from "zod";

type FormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!result.success) {
      alert(result.error);
    } else {
      alert("Registro exitoso");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Nombre" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} type="password" placeholder="Contraseña" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Registrarse</button>
    </form>
  );
};
