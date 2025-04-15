import { Loginform } from "@/components";
import { titleFont } from "@/config/fonts";

export default function () {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <div className="bg-slate-300 p-5 rounded-md shadow-md shadow-slate-400">
        <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

        <Loginform />
      </div>
    </div>
  );
}
