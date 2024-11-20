import { API_URL } from "@/util/config";
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from "react";

export default function useGetUserToken() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No se encontró token en el almacenamiento local");
      setLoading(false);
      return;
    }

    try {
      // Decodifica el token
      const decoded: any = jwtDecode(token);

      // Hace el fetch para obtener los datos del usuario
      const fetchUser = async () => {
        try {
          const response = await fetch(`${API_URL}/user/${decoded.sub}`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
          }

          const userData = await response.json();
          setUser(userData); // Almacena los datos del usuario en el estado
        } catch (err: any) {
          setError(err.message); // Si hay un error, lo almacena en el estado
        } finally {
          setLoading(false); // Finaliza el estado de carga
        }
      };

      fetchUser();
    } catch (err) {
      setError("Token inválido o expirado"); // Si hay un error al decodificar el token
      setLoading(false);
    }
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return { user, loading, error };
}
