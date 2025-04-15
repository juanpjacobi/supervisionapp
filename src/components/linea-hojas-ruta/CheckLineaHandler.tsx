'use client'
import { togleCompleted } from '@/actions/linea-hoja-ruta/linea-hoja-ruta-actions'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

interface Props {
    linea: any,
    hojaId: number
}


export const CheckLineaHandler = ({linea, hojaId}: Props) => {
    const handleClick = (lineaId:number, completada:boolean, hojaId: number) => {
        togleCompleted(lineaId, completada, hojaId)
    }
  return (
    <div onClick={() =>handleClick(linea.id, !linea.completada, hojaId)} className="flex gap-2 mt-2">
    {linea.completada ? (
      <div>

        <ImCheckboxChecked size={30} />
      </div>
    ) : (
      <div>
        <ImCheckboxUnchecked size={30} />
      </div>
    )}
  </div>
  )
}
