import { getRoles } from "@/actions";
import { UsuarioForm } from "@/components";

export default async function NewUsuario() {
    const {roles} = await getRoles();


  return (
    <div>
      <UsuarioForm roles={roles}/>
    </div>
  );
}
