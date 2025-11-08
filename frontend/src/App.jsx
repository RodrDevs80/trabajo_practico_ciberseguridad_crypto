import { useState } from "react";
import Swal from "sweetalert2";
import {
  cifrarTextoService,
  descifrarTextoService,
  generarClaveService,
} from "./service/crypto.service";

function App() {
  const [textoPlano, setTextoPlano] = useState("");
  const [pass, setPass] = useState("");
  const [textoCifrado, setTextoCifrado] = useState("");
  const [passInput, setPassInput] = useState("");
  const [ver, setVer] = useState(false);
  const [iv, setIv] = useState("");
  const [authTag, setAuthTag] = useState("");

  // Manejadores
  const hamdleGenerarClave = () => {
    generarClaveService()
      .then((res) => {
        if (res.success) {
          setPass(res.keyBase64);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const hamdleCifrar = () => {
    cifrarTextoService(textoPlano, pass)
      .then((res) => {
        setTextoCifrado(res.encrypted);
        setIv(res.iv);
        setAuthTag(res.authTag);
        setTextoPlano("");
      })
      .catch((err) => console.log(err.message));
  };

  const hamdleDecifrar = () => {
    descifrarTextoService(textoCifrado, passInput, iv, authTag)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Contenido del Texto Descifrado:",
          text: res.textoDesencriptado,
          background: "#1f2937",
          color: "#f9fafb",
          confirmButtonColor: "#3b82f6",
        });
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: "Error al intentar descifrar el texto",
          text: err.message,
          background: "#1f2937",
          color: "#f9fafb",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  const hamdleLimpiar = () => {
    setTextoPlano("");
    setPass("");
    setAuthTag("");
    setIv("");
    setTextoCifrado("");
    setPassInput("");
  };

  const hamdleVer = () => {
    setVer(!ver);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            App de Criptografía
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Genera claves seguras y cifra/descifra tus mensajes con tecnología
            avanzada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sección Izquierda - Cifrado */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Generar Clave
              </h2>
              <p className="text-gray-400 mb-4">
                Genera primero una clave segura que servirá para cifrar y
                descifrar tus mensajes
              </p>
              <button
                className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={hamdleGenerarClave}
              >
                Generar Clave
              </button>

              <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 font-medium">
                    Clave Generada:
                  </span>
                  <button
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                    onClick={hamdleVer}
                  >
                    {ver ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-700">
                  <code className="text-sm break-all">
                    {pass
                      ? ver
                        ? pass
                        : "•".repeat(32)
                      : "No se generó clave aún"}
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Cifrar Texto
              </h3>
              <textarea
                onChange={(e) => setTextoPlano(e.target.value)}
                value={textoPlano}
                name="textoPlano"
                id="textoPlano"
                rows="5"
                placeholder="Escribe el texto que quieres cifrar..."
                className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-white placeholder-gray-500"
              />

              <button
                className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl mt-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={hamdleCifrar}
                disabled={!textoPlano || !pass}
              >
                Cifrar Texto
              </button>
            </div>
          </div>

          {/* Sección Derecha - Descifrado */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Texto Cifrado
              </h3>
              <textarea
                value={textoCifrado}
                onChange={(e) => setTextoCifrado(e.target.value)}
                name="textCifrado"
                id="textCifrado"
                rows="5"
                placeholder="El texto cifrado aparecerá aquí..."
                className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-white placeholder-gray-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="clave"
                className="block text-gray-400 font-medium mb-2"
              >
                Clave para Descifrar
              </label>
              <input
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                name="clave"
                id="clave"
                type="text"
                placeholder="Pega aquí la clave generada..."
                className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={hamdleDecifrar}
                disabled={!textoCifrado || !passInput}
              >
                Descifrar Texto
              </button>
              <button
                className="flex-1 bg-linear-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={hamdleLimpiar}
              >
                Limpiar Todo
              </button>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="text-center text-gray-500 text-sm mt-8 pb-8">
          <p>
            Tu información está segura - Todo el proceso de cifrado se realiza
            localmente
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
