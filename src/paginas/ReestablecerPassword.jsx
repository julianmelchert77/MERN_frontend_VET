import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"


const ReestablecerPassword = () => {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

useEffect(() => {
    const comprobarToken = async () => {
        try {
            await clienteAxios(`/veterinarios/olvide-password/${token}`)
            setAlerta({
                msg: 'Ingresa una nueva contraseña'
            })
          setTokenValido(true);
        } catch (error) {
            setAlerta({
                msg: 'Hubo un error con el enlace',
                error: true
            })
        }
    }
    comprobarToken();
}, [])

const handleSubmit = async (e) =>  {
    e.preventDefault()

    if(password.length < 6) {
        setAlerta({
            msg: 'La contraseña debe tener como mínimo 6 caracteres',
            error: true
        })
        return
    }; 
        // Consulta a la API
        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const {data} = await clienteAxios.post(url, {password});

            setPasswordModificado(true);
            setAlerta({
                msg: data.msg
            })
        } catch (error) {
            setAlerta({
                msg: msg.response.data.msg,
                error: true
            });
        }

    
};

    const {msg} = alerta;

  return (
        <>
            
          <div>
              <h1 className="text-indigo-600 font-black text-6xl"> 
                  Ingresa Una Nueva Contraseña y Recupera Tu {""}
                  <span className="text-black"> Cuenta</span>
             </h1>
          </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg &&  <Alerta
                    alerta={alerta}
                />}

            {tokenValido && (
                <>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-5">

                            <label className="uppercase text-gray-600 block text-xl font-bold">

                                    Nueva Contraseña:
                            </label>
                                <input
                                    type="password"
                                    placeholder="Ingresa tu nuevo contraseña"
                                    className="border w-full p-3 bg-gray-50 rounded-xl"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                        </div>
                                <input
                                    type="submit"
                                    value="Reestablecer Contraseña"
                                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                                 />
                    </form>
                          
                </>
            )}

                {passwordModificado && 
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/">Iniciar Sesión</Link>
                } 
            
            </div>
        </>

  )
};

export default ReestablecerPassword;